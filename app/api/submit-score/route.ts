import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role key for server-side operations (keep secret!)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

interface GameSubmission {
  player_name: string;
  followers: number;
  credibility: number;
  badges_count: number;
  duration_seconds: number;
  game_data: any;
}

// Validate game data to prevent cheating
function validateGameSubmission(data: GameSubmission): { valid: boolean; error?: string } {
  // Check basic bounds
  if (data.badges_count < 0 || data.badges_count > 10) {
    return { valid: false, error: 'Invalid badges count' };
  }
  
  if (data.followers < 0 || data.followers > 100000) {
    return { valid: false, error: 'Invalid followers count' };
  }
  
  if (data.credibility < 0 || data.credibility > 200) {
    return { valid: false, error: 'Invalid credibility' };
  }
  
  if (data.duration_seconds < 30 || data.duration_seconds > 7200) {
    return { valid: false, error: 'Invalid duration (too fast or too slow)' };
  }
  
  if (!data.player_name || data.player_name.length < 2 || data.player_name.length > 30) {
    return { valid: false, error: 'Invalid player name' };
  }
  
  // Validate game history exists
  if (!data.game_data?.history || !Array.isArray(data.game_data.history)) {
    return { valid: false, error: 'Invalid game history' };
  }
  
  // Check if answered questions match the score
  const answeredCount = data.game_data.history.length;
  if (answeredCount !== 16) {
    return { valid: false, error: 'Must complete all 16 questions' };
  }
  
  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    const data: GameSubmission = await request.json();
    
    // Validate submission
    const validation = validateGameSubmission(data);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }
    
    // Check if player already exists
    const { data: existingData, error: fetchError } = await supabaseAdmin
      .from('leaderboard')
      .select('*')
      .eq('player_name', data.player_name)
      .single();
    
    // If player exists, compare scores
    if (existingData && !fetchError) {
      const isBetterScore = 
        data.badges_count > existingData.badges_count || 
        (data.badges_count === existingData.badges_count && data.followers > existingData.followers) ||
        (data.badges_count === existingData.badges_count && 
         data.followers === existingData.followers && 
         data.duration_seconds < existingData.duration_seconds);
      
      if (isBetterScore) {
        const { data: updatedData, error } = await supabaseAdmin
          .from('leaderboard')
          .update({
            followers: data.followers,
            credibility: data.credibility,
            badges_count: data.badges_count,
            completed_at: new Date().toISOString(),
            duration_seconds: data.duration_seconds,
            game_data: data.game_data
          })
          .eq('player_name', data.player_name)
          .select();
        
        if (error) {
          return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
          );
        }
        
        return NextResponse.json({ success: true, data: updatedData, updated: true });
      } else {
        return NextResponse.json({ 
          success: true, 
          data: existingData, 
          updated: false,
          message: 'Score not better than existing record' 
        });
      }
    }
    
    // Insert new record
    const { data: insertedData, error } = await supabaseAdmin
      .from('leaderboard')
      .insert([{
        player_name: data.player_name,
        followers: data.followers,
        credibility: data.credibility,
        badges_count: data.badges_count,
        completed_at: new Date().toISOString(),
        duration_seconds: data.duration_seconds,
        game_data: data.game_data
      }])
      .select();
    
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true, data: insertedData });
    
  } catch (error) {
    console.error('Error submitting score:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
