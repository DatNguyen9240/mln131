"use client";

interface GameHeaderProps {
  followers: number;
  credibility: number;
  badgeCount: number;
  totalBadges: number;
  answeredCount: number;
  totalQuestions: number;
}

export function GameHeader({
  followers,
  credibility,
  badgeCount,
  totalBadges,
  answeredCount,
  totalQuestions,
}: GameHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground hidden md:block">
              🎭 Trò Chơi Tin Giả
            </h1>
            <h1 className="text-lg font-bold text-foreground md:hidden">
              🎭 Tin Giả
            </h1>
          </div>

          {/* Stats Grid */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Progress */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border">
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Tiến độ
              </span>
              <span className="text-sm font-bold text-foreground">
                {answeredCount}/{totalQuestions}
              </span>
            </div>

            {/* Followers */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border">
              <span className="text-base">👥</span>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground leading-none hidden lg:block">
                  Followers
                </span>
                <span className="text-sm font-bold text-foreground leading-tight">
                  {followers >= 1000
                    ? `${(followers / 1000).toFixed(1)}k`
                    : followers}
                </span>
              </div>
            </div>

            {/* Credibility */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border">
              <span className="text-base">
                {credibility >= 100 ? "✨" : credibility >= 80 ? "⚡" : "⚠️"}
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground leading-none hidden lg:block">
                  Credibility
                </span>
                <span
                  className={`text-sm font-bold leading-tight ${
                    credibility >= 100
                      ? "text-green-600"
                      : credibility >= 80
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {credibility}
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
              <span className="text-base">🏆</span>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground leading-none hidden lg:block">
                  Huy hiệu
                </span>
                <span className="text-sm font-bold text-primary leading-tight">
                  {badgeCount}/{totalBadges}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
