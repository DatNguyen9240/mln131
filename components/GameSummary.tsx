"use client";

import { Badge } from "@/types/game";
import Link from "next/link";

interface GameSummaryProps {
  followers: number;
  credibility: number;
  badgesEarned: Badge[];
  style: string;
  dominantTags: [string, number][];
  totalAnswered: number;
  onRestart: () => void;
}

export function GameSummary({
  followers,
  credibility,
  badgesEarned,
  style,
  dominantTags,
  totalAnswered,
  onRestart,
}: GameSummaryProps) {
  const getSocialConsequences = () => {
    const consequences = [];

    if (followers >= 5000) {
      consequences.push(
        "📈 Bạn đã tạo được mạng lưới ảnh hưởng lớn, nhưng điều này đi kèm với trách nhiệm về sự thật."
      );
    }

    if (credibility < 50) {
      consequences.push(
        "⚠️ Độ tin cậy của bạn đã sụt giảm nghiêm trọng. Cộng đồng bắt đầu nghi ngờ mọi thông tin bạn chia sẻ."
      );
    }

    const kichDongCount = dominantTags.find((t) => t[0] === "kích động")?.[1] || 0;
    if (kichDongCount >= 5) {
      consequences.push(
        "🔥 Hành vi kích động cảm xúc liên tục có thể gia tăng phân cực xã hội và làm xói mòn đối thoại lành mạnh."
      );
    }

    const thoiPhongCount = dominantTags.find((t) => t[0] === "thổi phồng")?.[1] || 0;
    if (thoiPhongCount >= 5) {
      consequences.push(
        "💣 Thổi phồng thông tin tạo môi trường thiếu tin tưởng, khiến công chúng khó phân biệt sự thật."
      );
    }

    if (badgesEarned.length >= 8) {
      consequences.push(
        "🎭 Bạn đã thành thạo nhiều chiến thuật thao túng khác nhau, cho thấy khả năng điều khiển dư luận đáng lo ngại."
      );
    }

    if (consequences.length === 0) {
      consequences.push(
        "✅ Bạn đã duy trì một cách tiếp cận cân bằng hơn, nhưng vẫn tham gia vào hệ thống lan truyền thông tin sai lệch."
      );
    }

    return consequences;
  };

  const getEducationalMessage = () => {
    return [
      "📚 Bài học quan trọng:",
      "• Kiểm chứng nguồn tin trước khi chia sẻ",
      "• Nhận diện các dấu hiệu thao túng: tiêu đề giật gân, cảm xúc cực đoan, thiếu ngữ cảnh",
      "• Tác động của tin giả không chỉ là số liệu mà còn là sự phân cực và mất niềm tin cộng đồng",
      "• Mỗi người đều có trách nhiệm trong việc xây dựng không gian thông tin lành mạnh",
    ];
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          🎮 Kết thúc trò chơi
        </h1>
        <p className="text-muted-foreground">
          Bạn đã hoàn thành {totalAnswered}/16 câu hỏi
        </p>
      </div>

      {/* Final Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-sm text-muted-foreground mb-2">
            Followers cuối cùng
          </div>
          <div className="text-3xl font-bold text-foreground">
            {followers.toLocaleString()}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-sm text-muted-foreground mb-2">
            Credibility cuối cùng
          </div>
          <div
            className={`text-3xl font-bold ${
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

      {/* Badges Earned */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          🏆 Huy hiệu đạt được: {badgesEarned.length}/10
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {badgesEarned.map((badge) => (
            <div
              key={badge.id}
              className="p-3 bg-primary/10 border border-primary rounded-lg text-center"
            >
              <div className="text-3xl mb-1">{badge.icon}</div>
              <div className="text-xs font-medium text-foreground">
                {badge.name}
              </div>
            </div>
          ))}
        </div>
        {badgesEarned.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            Bạn chưa đạt được huy hiệu nào
          </p>
        )}
      </div>

      {/* Style Analysis */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          📊 Phong cách thao túng
        </h2>
        <p className="text-lg font-medium text-primary mb-4">{style}</p>
        {dominantTags.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Các chiến thuật sử dụng nhiều:</p>
            {dominantTags.map(([tag, count]) => (
              <div key={tag} className="flex justify-between items-center">
                <span className="text-foreground capitalize">{tag}</span>
                <span className="text-muted-foreground">{count} lần</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Social Consequences */}
      <div className="bg-card border border-destructive rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          ⚠️ Hệ quả xã hội
        </h2>
        <div className="space-y-3">
          {getSocialConsequences().map((consequence, idx) => (
            <p key={idx} className="text-foreground leading-relaxed">
              {consequence}
            </p>
          ))}
        </div>
      </div>

      {/* Educational Message */}
      <div className="bg-primary/5 border border-primary rounded-lg p-6">
        <div className="space-y-2">
          {getEducationalMessage().map((msg, idx) => (
            <p key={idx} className="text-foreground leading-relaxed">
              {msg}
            </p>
          ))}
        </div>
      </div>

      {/* Restart Button */}
      <div className="flex justify-center gap-4 pt-4">
        <Link
          href="/leaderboard"
          className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          🏆 Xem bảng xếp hạng
        </Link>
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          🔄 Chơi lại
        </button>
      </div>
    </div>
  );
}
