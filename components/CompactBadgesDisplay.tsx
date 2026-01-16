"use client";

import { Badge } from "@/types/game";

interface BadgeProgress {
  current: number;
  target: number;
  label: string;
  details?: string;
}

interface CompactBadgesDisplayProps {
  earnedBadges: Set<string>;
  allBadges: Badge[];
  getBadgeProgress: (badge: Badge) => BadgeProgress;
}

export function CompactBadgesDisplay({
  earnedBadges,
  allBadges,
  getBadgeProgress,
}: CompactBadgesDisplayProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        🏆 Huy hiệu ({earnedBadges.size}/{allBadges.length})
      </h2>

      <div className="space-y-2">
        {allBadges.map((badge) => {
          const isEarned = earnedBadges.has(badge.id);
          const progress = getBadgeProgress(badge);
          const progressPercent = Math.min(
            100,
            (progress.current / progress.target) * 100
          );

          return (
            <div
              key={badge.id}
              className={`relative rounded-lg border transition-all ${
                isEarned
                  ? "bg-primary/10 border-primary"
                  : "bg-background border-border"
              }`}
            >
              <div className="p-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl flex-shrink-0">{badge.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-semibold ${
                        isEarned ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {badge.name}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {badge.description}
                    </div>
                  </div>
                  {isEarned && (
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {!isEarned && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">
                        {progress.details || `${progress.current}/${progress.target} ${progress.label}`}
                      </span>
                      <span
                        className={`font-semibold ${
                          progressPercent >= 100
                            ? "text-green-600"
                            : progressPercent >= 50
                            ? "text-yellow-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {Math.floor(progressPercent)}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          progressPercent >= 100
                            ? "bg-green-500"
                            : progressPercent >= 50
                            ? "bg-yellow-500"
                            : "bg-primary/50"
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
