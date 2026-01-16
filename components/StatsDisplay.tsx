"use client";

interface StatsDisplayProps {
  followers: number;
  credibility: number;
  badgeCount: number;
  totalBadges: number;
}

export function StatsDisplay({
  followers,
  credibility,
  badgeCount,
  totalBadges,
}: StatsDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Followers */}
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-sm text-muted-foreground mb-1">Followers</div>
          <div className="text-2xl font-bold text-foreground">
            {followers.toLocaleString()}
          </div>
        </div>

        {/* Credibility */}
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-sm text-muted-foreground mb-1">Credibility</div>
          <div
            className={`text-2xl font-bold ${
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

        {/* Badges */}
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-sm text-muted-foreground mb-1">Huy hiệu</div>
          <div className="text-2xl font-bold text-primary">
            {badgeCount}/{totalBadges}
          </div>
        </div>
      </div>
    </div>
  );
}
