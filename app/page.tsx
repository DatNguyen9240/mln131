"use client";

import { useState } from "react";
import { useGameLogic } from "@/hooks/useGameLogic";
import { QuestionCard } from "@/components/QuestionCard";
import { GameSummary } from "@/components/GameSummary";
import { GameOver } from "@/components/GameOver";
import { GameLayout } from "@/components/GameLayout";
import { GameHeader } from "@/components/GameHeader";
import { CompactBadgesDisplay } from "@/components/CompactBadgesDisplay";

export default function Home() {
  const {
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
    allBadges,
  } = useGameLogic();

  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="w-full max-w-5xl mx-auto space-y-6">
          {/* Title */}
          <div className="text-center space-y-3 py-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              🎭 Trò Chơi Tin Giả
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Mô phỏng lan truyền thông tin sai lệch trên mạng xã hội
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-lg">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                📋 Giới thiệu
              </h2>
              <p className="text-foreground leading-relaxed text-lg">
                Trong trò chơi này, bạn sẽ nhập vai người tạo và lan truyền tin
                giả trên mạng xã hội tại Việt Nam. Đây là một trò chơi{" "}
                <strong className="text-primary">giáo dục</strong>, giúp bạn hiểu rõ các chiến thuật thao
                túng thông tin và hệ quả của chúng.
              </p>
              <div className="bg-destructive/10 border-2 border-destructive rounded-xl p-4">
                <p className="text-foreground">
                  ⚠️ <strong>Lưu ý:</strong> Tất cả các lựa chọn trong game đều
                  là hành vi thao túng thông tin. Không có đáp án "đúng" tuyệt
                  đối — mỗi lựa chọn đều có đánh đổi giữa lan truyền và uy tín.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 bg-background rounded-xl p-5 border border-border">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  🎯 Mục tiêu
                </h3>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Thu thập tối đa <strong className="text-primary">10 huy hiệu</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Trải qua <strong>16 tình huống</strong> với 4 lựa chọn mỗi câu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Quản lý <strong>Followers</strong> và <strong>Credibility</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Mở khoá câu hỏi dựa trên hành vi của bạn</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 bg-background rounded-xl p-5 border border-border">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  🏆 Huy hiệu
                </h3>
                <p className="text-foreground leading-relaxed">
                  10 huy hiệu sẽ được mở khi bạn thực hiện các hành vi thao túng cụ
                  thể. Một số yêu cầu chuỗi hành vi liên tiếp, một số yêu
                  cầu đạt ngưỡng chỉ số. Một số huy hiệu xung đột nhau!
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-muted/50 rounded-xl p-5 border border-border">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                💡 Chủ đề
              </h3>
              <p className="text-foreground leading-relaxed italic">
                "Ngày càng nhiều người dân tham gia thảo luận chính sách, giám
                sát cán bộ, bày tỏ quan điểm xã hội trên mạng xã hội. Đây là một
                biểu hiện mới của dân chủ, nhưng cũng kéo theo tin giả, thông tin
                sai lệch, lợi dụng dân chủ để chống phá."
              </p>
            </div>

            <div className="bg-primary/5 border-2 border-primary rounded-xl p-5">
              <p className="text-foreground text-center">
                ℹ️ Trò chơi này mang tính <strong>giáo dục</strong>, giúp người chơi nhận diện các
                hình thức thao túng thông tin và hiểu rõ hệ quả xã hội của chúng.
              </p>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center py-4">
            <button
              onClick={() => setShowIntro(false)}
              className="px-16 py-5 bg-primary text-primary-foreground rounded-xl text-xl font-bold hover:opacity-90 hover:scale-105 transition-all shadow-xl"
            >
              🎮 Bắt đầu chơi
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (gameOver) {
    return (
      <GameOver
        reason={gameOverReason as "credibility" | "followers"}
        finalFollowers={gameState.followers}
        finalCredibility={gameState.credibility}
        badgeCount={gameState.badges.size}
        answeredCount={gameState.answeredQuestions.size}
        onRestart={() => {
          resetGame();
          setShowIntro(true);
        }}
      />
    );
  }

  if (gameCompleted) {
    const summary = getGameSummary();
    return (
      <main className="min-h-screen bg-background py-12 px-4">
        <GameSummary
          followers={gameState.followers}
          credibility={gameState.credibility}
          badgesEarned={summary.badgesEarned}
          style={summary.style}
          dominantTags={summary.dominantTags}
          totalAnswered={summary.totalAnswered}
          onRestart={() => {
            resetGame();
            setShowIntro(true);
          }}
        />
      </main>
    );
  }

  if (!currentQuestion) {
    return (
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="w-full max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold text-foreground">
            Không có câu hỏi khả dụng
          </h1>
          <p className="text-muted-foreground">
            Bạn cần đạt điều kiện để mở khoá câu hỏi tiếp theo.
          </p>
          <button
            onClick={resetGame}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Chơi lại
          </button>
        </div>
      </main>
    );
  }

  return (
    <GameLayout
      header={
        <GameHeader
          followers={gameState.followers}
          credibility={gameState.credibility}
          badgeCount={gameState.badges.size}
          totalBadges={allBadges.length}
          answeredCount={gameState.answeredQuestions.size}
          totalQuestions={16}
        />
      }
      sidebar={
        <>
          {/* Badges */}
          <CompactBadgesDisplay
            earnedBadges={gameState.badges}
            allBadges={allBadges}
            getBadgeProgress={getBadgeProgress}
          />

          {/* Info */}
          <div className="pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              💡 Còn {availableQuestions.length} câu có thể trả lời
            </div>
          </div>
        </>
      }
    >
      <div className="max-w-4xl mx-auto">
        {/* Question */}
        <QuestionCard
          questionNumber={gameState.answeredQuestions.size + 1}
          totalQuestions={16}
          situation={currentQuestion.situation}
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          onSelectAnswer={selectAnswer}
        />
      </div>
    </GameLayout>
  );
}
