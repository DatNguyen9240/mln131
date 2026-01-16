// Game types and interfaces

export interface GameState {
  followers: number;
  credibility: number;
  answeredQuestions: Map<number, string>; // questionId -> answerId
  unlockedQuestions: Set<number>;
  badges: Set<string>;
  history: GameAction[];
}

export interface GameAction {
  questionId: number;
  answerId: string;
  followersChange: number;
  credibilityChange: number;
  timestamp: Date;
}

export interface Answer {
  id: string;
  text: string;
  followersChange: number;
  credibilityChange: number;
  tags?: string[]; // e.g., "sensational", "distorting", "fear", "moral_opposite"
}

export interface Question {
  id: number;
  stage: number;
  situation: string;
  question: string;
  answers: Answer[];
  unlockCondition?: UnlockCondition;
}

export interface UnlockCondition {
  type: 'always' | 'followers' | 'credibility' | 'badge' | 'badge_count' | 'both';
  value?: number;
  badgeRequired?: string;
  followersValue?: number;
  credibilityValue?: number;
  badgeCountValue?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: 'earned_by_doing' | 'earned_by_resisting' | 'neutral';
  condition: BadgeCondition;
  icon: string;
}

export interface BadgeCondition {
  type: 'followers' | 'credibility' | 'tag_count' | 'streak' | 'followers_streak' | 'both' | 'question_choice';
  tag?: string;
  count?: number;
  value?: number;
  followersValue?: number;
  credibilityValue?: number;
  questionId?: number;
  answerId?: string;
}
