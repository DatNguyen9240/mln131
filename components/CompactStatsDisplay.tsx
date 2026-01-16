"use client";

interface CompactStatsDisplayProps {
  followers: number;
  credibility: number;
  badgeCount: number;
  totalBadges: number;
  answeredCount: number;
  totalQuestions: number;
}

export function CompactStatsDisplay({
  followers,
  credibility,
  badgeCount,
  totalBadges,
  answeredCount,
  totalQuestions,
}: CompactStatsDisplayProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        📊 Thống kê
      </h2>
      
      {/* Progress */}
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Tiến độ</span>
          <span className="text-sm font-bold text-foreground">
            {answeredCount}/{totalQuestions}
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Followers */}
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">👥</div>
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">Followers</div>
            <div className="text-xl font-bold text-foreground">
              {followers.toLocaleString()}
            </div>
          </div>
        </div>
        {followers >= 5000 && (
          <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
            <span>🔥</span> Viral!
          </div>
        )}
      </div>

      {/* Credibility */}
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {credibility >= 120 ? "✨" : credibility >= 80 ? "⚡" : "⚠️"}
          </div>
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">Credibility</div>
            <div
              className={`text-xl font-bold ${
                credibility >= 120
                  ? "text-green-600"
                  : credibility >= 80
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {credibility}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${
                credibility >= 120
                  ? "bg-green-600"
                  : credibility >= 80
                  ? "bg-yellow-600"
                  : "bg-red-600"
              }`}
              style={{ width: `${Math.min(100, (credibility / 150) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🏆</div>
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">Huy hiệu</div>
            <div className="text-xl font-bold text-primary">
              {badgeCount}/{totalBadges}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all"
              style={{ width: `${(badgeCount / totalBadges) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
