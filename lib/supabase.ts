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

// Save game result to leaderboard
export async function saveGameResult(entry: LeaderboardEntry) {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Skipping save.');
    return { success: false, error: 'Supabase not configured' };
  }

  const supabase = getSupabase();
  
  // Check if player already exists
  const { data: existingData, error: fetchError } = await supabase
    .from('leaderboard')
    .select('*')
    .eq('player_name', entry.player_name)
    .single();

  // If player exists, compare scores and update if new score is better
  if (existingData && !fetchError) {
    // Only update if new score is better (more badges, or same badges but more followers, or same but faster time)
    const isBetterScore = entry.badges_count > existingData.badges_count || 
                          (entry.badges_count === existingData.badges_count && entry.followers > existingData.followers) ||
                          (entry.badges_count === existingData.badges_count && entry.followers === existingData.followers && entry.duration_seconds < existingData.duration_seconds);
    
    if (isBetterScore) {
      const { data, error } = await supabase
        .from('leaderboard')
        .update({
          followers: entry.followers,
          credibility: entry.credibility,
          badges_count: entry.badges_count,
          completed_at: entry.completed_at,
          duration_seconds: entry.duration_seconds,
          game_data: entry.game_data
        })
        .eq('player_name', entry.player_name)
        .select();

      if (error) {
        console.error('Error updating game result:', error);
        return { success: false, error };
      }

      return { success: true, data, updated: true };
    } else {
      // Score not better, don't update
      return { success: true, data: existingData, updated: false, message: 'Score not better than existing record' };
    }
  }

  // Player doesn't exist, insert new record
  const { data, error } = await supabase
    .from('leaderboard')
    .insert([{
      player_name: entry.player_name,
      followers: entry.followers,
      credibility: entry.credibility,
      duration_seconds: entry.duration_seconds,
      badges_count: entry.badges_count,
      completed_at: entry.completed_at,
      game_data: entry.game_data
    }])
    .select();

  if (error) {
    console.error('Error saving game result:', error);
    return { success: false, error };
  }

  return { success: true, data };
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
