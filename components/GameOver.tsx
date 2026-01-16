"use client";

interface GameOverProps {
  reason: "credibility" | "followers";
  finalFollowers: number;
  finalCredibility: number;
  badgeCount: number;
  answeredCount: number;
  onRestart: () => void;
}

export function GameOver({
  reason,
  finalFollowers,
  finalCredibility,
  badgeCount,
  answeredCount,
  onRestart,
}: GameOverProps) {
  const getMessage = () => {
    if (reason === "credibility") {
      return {
        title: "💀 GAME OVER: Mất Uy Tín Hoàn Toàn",
        description:
          "Credibility của bạn đã xuống âm (≤ 0). Cộng đồng không còn tin tưởng bạn nữa.",
        consequences: [
          "🚫 Tài khoản của bạn bị đánh dấu là nguồn tin giả",
          "⚠️ Nền tảng mạng xã hội hạn chế tầm với của bạn",
          "👥 Người theo dõi bỏ đi hàng loạt",
          "⚖️ Có thể bị xử lý pháp lý nếu gây thiệt hại nghiêm trọng",
        ],
        icon: "⚠️",
        color: "text-red-600",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500",
      };
    } else {
      return {
        title: "📉 GAME OVER: Mất Hết Người Theo Dõi",
        description:
          "Followers của bạn đã giảm xuống dưới 50. Không còn ai quan tâm đến nội dung của bạn.",
        consequences: [
          "👻 Bạn trở thành 'bóng ma' trên mạng xã hội",
          "📱 Không ai tương tác với bài đăng của bạn",
          "💔 Mất hoàn toàn khả năng ảnh hưởng",
          "🔄 Phải xây dựng lại từ đầu với chiến lược mới",
        ],
        icon: "📉",
        color: "text-orange-600",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500",
      };
    }
  };

  const message = getMessage();

  return (
    <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="text-6xl">{message.icon}</div>
          <h1 className={`text-3xl md:text-4xl font-bold ${message.color}`}>
            {message.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {message.description}
          </p>
        </div>

        {/* Stats */}
        <div className={`bg-card border-2 ${message.borderColor} rounded-2xl p-6`}>
          <h2 className="text-xl font-bold text-foreground mb-4">
            📊 Thống kê cuối cùng
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Câu trả lời</div>
              <div className="text-2xl font-bold text-foreground">
                {answeredCount}/16
              </div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Followers</div>
              <div className="text-2xl font-bold text-foreground">
                {finalFollowers}
              </div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Credibility</div>
              <div className={`text-2xl font-bold ${message.color}`}>
                {finalCredibility}
              </div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Huy hiệu</div>
              <div className="text-2xl font-bold text-primary">
                {badgeCount}/10
              </div>
            </div>
          </div>
        </div>

        {/* Consequences */}
        <div className={`${message.bgColor} border-2 ${message.borderColor} rounded-2xl p-6`}>
          <h2 className="text-xl font-bold text-foreground mb-4">
            ⚠️ Hậu quả
          </h2>
          <div className="space-y-3">
            {message.consequences.map((consequence, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-foreground font-medium leading-relaxed">
                  {consequence}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Message */}
        <div className="bg-primary/5 border-2 border-primary rounded-2xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">
            💡 Bài học
          </h2>
          <div className="space-y-2 text-foreground">
            <p>
              • Tin giả không chỉ làm mất uy tín mà còn có thể phá hủy hoàn toàn khả năng lan truyền thông tin.
            </p>
            <p>
              • Trong thực tế, hành vi lan truyền tin giả có thể dẫn đến xử lý pháp lý nghiêm khắc.
            </p>
            <p>
              • Xây dựng uy tín mất nhiều năm, nhưng phá hủy chỉ trong vài phút.
            </p>
            <p>
              • Luôn kiểm chứng thông tin trước khi chia sẻ để bảo vệ bản thân và cộng đồng.
            </p>
          </div>
        </div>

        {/* Restart Button */}
        <div className="text-center pt-4">
          <button
            onClick={onRestart}
            className="px-12 py-4 bg-primary text-primary-foreground rounded-xl text-xl font-bold hover:opacity-90 hover:scale-105 transition-all shadow-xl"
          >
            🔄 Thử lại
          </button>
        </div>
      </div>
    </div>
  );
}
