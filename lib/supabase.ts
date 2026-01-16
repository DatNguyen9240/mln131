import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  if (typeof window === 'undefined') return false; // Skip during SSR
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  // Check if values are set and not placeholder values
  const hasValidUrl = url !== '' && 
                      url !== 'your_supabase_url_here' && 
                      url.includes('supabase.co');
  
  const hasValidKey = key !== '' && 
                      key !== 'your_supabase_anon_key_here' && 
                      key.length > 100 && // Supabase anon keys are typically very long JWT tokens
                      key.startsWith('eyJ'); // JWT tokens start with eyJ
  
  return hasValidUrl && hasValidKey;
};

// Get or create Supabase client
function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU1MzQwMDAsImV4cCI6MTk2MTExMDAwMH0.placeholder';
    supabaseInstance = createClient(url, key);
  }
  return supabaseInstance;
}

export interface LeaderboardEntry {
  id?: string;
  player_name: string;
  followers: number;
  credibility: number;
  badges_count: number;
  completed_at: string;
  duration_seconds: number;
  game_data?: any;
}

// Save game result to leaderboard (via secure API endpoint)
export async function saveGameResult(entry: LeaderboardEntry) {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Skipping save.');
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    // Call secure API endpoint instead of direct Supabase access
    const response = await fetch('/api/submit-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Error submitting score:', result.error);
      return { success: false, error: result.error };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error submitting score:', error);
    return { success: false, error };
  }
}

// Get top leaderboard entries
export async function getLeaderboard(limit: number = 50) {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty leaderboard.');
    return { success: false, error: 'Supabase not configured', data: [] };
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('badges_count', { ascending: false })
    .order('followers', { ascending: false })
    .order('duration_seconds', { ascending: true }) // Thời gian ít hơn (nhanh
    .order('completed_at', { ascending: false }) // Người hoàn thành sau (mới hơn) lên trước
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

// Get user's personal best
export async function getUserPersonalBest(playerName: string) {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return { success: false, error: 'Supabase not configured' };
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .eq('player_name', playerName)
    .order('followers', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching personal best:', error);
    return { success: false, error };
  }

  return { success: true, data: data?.[0] };
}

// Subscribe to realtime updates on leaderboard
export function subscribeToLeaderboard(callback: (data: LeaderboardEntry) => void) {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Skipping realtime subscription.');
    return null;
  }

  const supabase = getSupabase();
  
  const subscription = supabase
    .channel('leaderboard-changes')
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'leaderboard',
      },
      (payload) => {
        console.log('Realtime update:', payload);
        if (payload.new) {
          callback(payload.new as LeaderboardEntry);
        }
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(subscription);
  };
}
