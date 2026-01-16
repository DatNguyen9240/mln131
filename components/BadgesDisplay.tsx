"use client";

import { Badge } from "@/types/game";

interface BadgesDisplayProps {
  earnedBadges: Set<string>;
  allBadges: Badge[];
}

export function BadgesDisplay({ earnedBadges, allBadges }: BadgesDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        🏆 Huy hiệu (10 tổng)
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {allBadges.map((badge) => {
          const isEarned = earnedBadges.has(badge.id);
          return (
            <div
              key={badge.id}
              className={`relative p-3 rounded-lg border text-center transition-all ${
                isEarned
                  ? "bg-primary/10 border-primary shadow-md"
                  : "bg-muted border-border opacity-50"
              }`}
              title={badge.description}
            >
              <div className="text-3xl mb-1">{badge.icon}</div>
              <div className="text-xs font-medium text-foreground">
                {badge.name}
              </div>
              {isEarned && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
