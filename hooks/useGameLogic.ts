"use client";

import { useState, useCallback, useEffect } from "react";
import { GameState, GameAction, Answer, Badge } from "@/types/game";
import { QUESTIONS, BADGES } from "@/data/gameData";
import { saveGameResult } from "@/lib/supabase";

const INITIAL_STATE: GameState = {
  followers: 100,
  credibility: 100,
  answeredQuestions: new Map(),
  unlockedQuestions: new Set([1, 2, 3, 4, 6, 9, 10, 12, 14]),
  badges: new Set(),
  history: [],
};

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("");
  const [tagCounts, setTagCounts] = useState<Map<string, number>>(new Map());
  const [streakCounts, setStreakCounts] = useState<Map<string, number>>(
    new Map()
  );
  const [recentFollowersGains, setRecentFollowersGains] = useState<number[]>(
    []
  );
  const [playerName, setPlayerName] = useState<string>("");
  const [gameStartTime, setGameStartTime] = useState<number>(Date.now());

  // Get available questions
  const availableQuestions = QUESTIONS.filter((q) =>
    gameState.unlockedQuestions.has(q.id)
  ).filter((q) => !gameState.answeredQuestions.has(q.id));

  const currentQuestion =
    availableQuestions.length > 0
      ? availableQuestions[currentQuestionIndex]
      : null;

  // Check if a badge should be unlocked
  const checkBadgeUnlock = useCallback(
    (
      state: GameState,
      tags: Map<string, number>,
      streaks: Map<string, number>,
      recentGains: number[],
      answerId?: string,
      questionId?: number
    ) => {
      const newBadges = new Set(state.badges);

      BADGES.forEach((badge) => {
        if (newBadges.has(badge.id)) return;

        const cond = badge.condition;
        let shouldUnlock = false;

        switch (cond.type) {
          case "followers":
            shouldUnlock = state.followers >= (cond.value || 0);
            break;
          case "credibility":
            shouldUnlock = state.credibility >= (cond.value || 0);
            break;
          case "tag_count":
            shouldUnlock =
              (tags.get(cond.tag || "") || 0) >= (cond.count || 0);
            break;
          case "streak":
            shouldUnlock =
              (streaks.get(cond.tag || "") || 0) >= (cond.count || 0);
            break;
          case "followers_streak":
            const totalGain = recentGains.reduce((a, b) => a + b, 0);
            shouldUnlock = totalGain >= (cond.value || 0);
            break;
          case "both":
            if (cond.followersValue && cond.credibilityValue) {
              shouldUnlock =
                state.followers >= cond.followersValue &&
                state.credibility >= cond.credibilityValue;
            }
            break;
          case "question_choice":
            if (cond.questionId && cond.answerId) {
              shouldUnlock =
                questionId === cond.questionId && answerId === cond.answerId;
            }
            break;
        }

        if (shouldUnlock) {
          newBadges.add(badge.id);
        }
      });

      return newBadges;
    },
    []
  );

  // Get badge progress
  const getBadgeProgress = useCallback(
    (badge: Badge) => {
      const cond = badge.condition;
      
      switch (cond.type) {
        case "followers":
          return {
            current: gameState.followers,
            target: cond.value || 0,
            label: "Followers",
          };
        case "credibility":
          return {
            current: gameState.credibility,
            target: cond.value || 0,
            label: "Credibility",
          };
        case "tag_count":
          return {
            current: tagCounts.get(cond.tag || "") || 0,
            target: cond.count || 0,
            label: "lần",
          };
        case "both":
          const followersProgress = gameState.followers >= (cond.followersValue || 0);
          const credibilityProgress = gameState.credibility >= (cond.credibilityValue || 0);
          return {
            current: (followersProgress ? 1 : 0) + (credibilityProgress ? 1 : 0),
            target: 2,
            label: "điều kiện",
            details: `${gameState.followers}/${cond.followersValue}F, ${gameState.credibility}/${cond.credibilityValue}C`,
          };
        default:
          return {
            current: 0,
            target: 1,
            label: "",
          };
      }
    },
    [gameState, tagCounts]
  );

  // Check unlock conditions for questions
  const checkQuestionUnlock = useCallback((state: GameState) => {
    const newUnlocked = new Set(state.unlockedQuestions);

    QUESTIONS.forEach((question) => {
      if (newUnlocked.has(question.id)) return;

      const cond = question.unlockCondition;
      if (!cond) return;

      let shouldUnlock = false;

      switch (cond.type) {
        case "always":
          shouldUnlock = true;
          break;
        case "followers":
          shouldUnlock = state.followers >= (cond.value || 0);
          break;
        case "credibility":
          shouldUnlock = state.credibility >= (cond.value || 0);
          break;
        case "badge":
          shouldUnlock = state.badges.has(cond.badgeRequired || "");
          break;
        case "badge_count":
          shouldUnlock = state.badges.size >= (cond.value || 0);
          break;
        case "both":
          if (cond.followersValue !== undefined) {
            shouldUnlock = state.followers >= cond.followersValue;
          }
          if (
            shouldUnlock &&
            cond.badgeCountValue !== undefined
          ) {
            shouldUnlock = state.badges.size >= cond.badgeCountValue;
          }
          break;
      }

      if (shouldUnlock) {
        newUnlocked.add(question.id);
      }
    });

    return newUnlocked;
  }, []);

  // Handle answer selection
  const selectAnswer = useCallback(
    (answer: Answer) => {
      if (!currentQuestion) return;

      const newFollowers = Math.max(
        0,
        gameState.followers + answer.followersChange
      );
      const newCredibility = Math.max(
        0,
        gameState.credibility + answer.credibilityChange
      );

      const action: GameAction = {
        questionId: currentQuestion.id,
        answerId: answer.id,
        followersChange: answer.followersChange,
        credibilityChange: answer.credibilityChange,
        timestamp: new Date(),
      };

      // Update tag counts
      const newTagCounts = new Map(tagCounts);
      answer.tags?.forEach((tag) => {
        newTagCounts.set(tag, (newTagCounts.get(tag) || 0) + 1);
      });

      // Update streak counts
      const newStreakCounts = new Map(streakCounts);
      answer.tags?.forEach((tag) => {
        // Increment streak for this tag
        newStreakCounts.set(tag, (newStreakCounts.get(tag) || 0) + 1);
      });
      // Reset streaks for tags not in this answer
      streakCounts.forEach((_, tag) => {
        if (!answer.tags?.includes(tag)) {
          newStreakCounts.set(tag, 0);
        }
      });

      // Track recent followers gains for streak badge
      const newRecentGains = [
        ...recentFollowersGains,
        answer.followersChange,
      ].slice(-3);

      const newState: GameState = {
        followers: newFollowers,
        credibility: newCredibility,
        answeredQuestions: new Map(gameState.answeredQuestions).set(
          currentQuestion.id,
          answer.id
        ),
        unlockedQuestions: gameState.unlockedQuestions,
        badges: gameState.badges,
        history: [...gameState.history, action],
      };

      // Check badge unlocks
      const updatedBadges = checkBadgeUnlock(
        newState,
        newTagCounts,
        newStreakCounts,
        newRecentGains,
        answer.id,
        currentQuestion.id
      );
      newState.badges = updatedBadges;

      // Check question unlocks
      const updatedUnlocked = checkQuestionUnlock(newState);
      newState.unlockedQuestions = updatedUnlocked;

      setGameState(newState);
      setTagCounts(newTagCounts);
      setStreakCounts(newStreakCounts);
      setRecentFollowersGains(newRecentGains);

      // Check game over conditions
      if (newState.credibility <= 0) {
        setGameOver(true);
        setGameOverReason("credibility");
        return;
      }
      if (newState.followers < 50) {
        setGameOver(true);
        setGameOverReason("followers");
        return;
      }

      // Move to next question
      const remainingQuestions = QUESTIONS.filter(
        (q) => updatedUnlocked.has(q.id) && !newState.answeredQuestions.has(q.id)
      );

      if (remainingQuestions.length === 0) {
        setGameCompleted(true);
        // Save to leaderboard when game completes
        if (playerName) {
          const durationSeconds = Math.floor((Date.now() - gameStartTime) / 1000);
          saveGameResult({
            player_name: playerName,
            followers: newState.followers,
            credibility: newState.credibility,
            badges_count: newState.badges.size,
            completed_at: new Date().toISOString(),
            duration_seconds: durationSeconds,
            game_data: {
              history: newState.history,
              badges: Array.from(newState.badges),
            },
          }).catch(err => console.error('Failed to save game result:', err));
        }
      } else {
        setCurrentQuestionIndex(0);
      }
    },
    [
      currentQuestion,
      gameState,
      tagCounts,
      streakCounts,
      recentFollowersGains,
      checkBadgeUnlock,
      checkQuestionUnlock,
    ]
  );

  // Reset game
  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
    setCurrentQuestionIndex(0);
    setGameCompleted(false);
    setGameOver(false);
    setGameOverReason("");
    setTagCounts(new Map());
    setGameStartTime(Date.now()); // Reset start time
    setStreakCounts(new Map());
    setRecentFollowersGains([]);
  }, []);

  // Get game summary
  const getGameSummary = useCallback(() => {
    const dominantTags = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    let style = "Cân bằng";
    if (dominantTags[0]) {
      const [tag, count] = dominantTags[0];
      if (count >= 5) {
        switch (tag) {
          case "clickbait":
            style = "Thợ Câu View chuyên nghiệp";
            break;
          case "mạo danh":
            style = "Mạo danh giả mạo";
            break;
          case "chỉnh sửa":
            style = "Photoshop/Deepfake";
            break;
          case "sai ngữ cảnh":
            style = "Sử dụng sai ngữ cảnh";
            break;
          case "nguồn mờ":
            style = "Nguồn tin mờ ám";
            break;
          case "cắt ghép":
            style = "Cắt ghép thông tin";
            break;
          case "bot":
            style = "Sử dụng bot/tài khoản ảo";
            break;
        }
      }
    }

    return {
      style,
      dominantTags,
      totalAnswered: gameState.answeredQuestions.size,
      badgesEarned: Array.from(gameState.badges).map(
        (id) => BADGES.find((b) => b.id === id)!
      ),
    };
  }, [gameState, tagCounts]);

  return {
    gameState,
    currentQuestion,
    availableQuestions,
    gameCompleted,
    gameOver,
    gameOverReason,
    selectAnswer,
    resetGame,
    getGameSummary,
    getBadgeProgress,
    allBadges: BADGES,
    playerName,
    setPlayerName,
  };
}
