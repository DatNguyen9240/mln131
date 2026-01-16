"use client";

import { Answer } from "@/types/game";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  situation: string;
  question: string;
  answers: Answer[];
  onSelectAnswer: (answer: Answer) => void;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  situation,
  question,
  answers,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="w-full space-y-6 py-4">
      {/* Situation Badge */}
      <div className="flex justify-center">
        <span className="inline-block px-6 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border-2 border-primary/20">
          📍 {situation}
        </span>
      </div>

      {/* Question */}
      <div className="bg-card border-2 border-border rounded-xl p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
            {questionNumber}
          </div>
          <h2 className="text-2xl font-semibold text-foreground leading-relaxed pt-1">
            {question}
          </h2>
        </div>
      </div>
      {/* Answers */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-muted-foreground px-2">
          Chọn hành động của bạn:
        </div>
        {answers.map((answer, index) => (
          <button
            key={answer.id}
            onClick={() => onSelectAnswer(answer)}
            className="group relative w-full text-left p-6 bg-card border-2 border-border rounded-xl hover:border-primary hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {String.fromCharCode(65 + index)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground leading-relaxed text-lg mb-3">
                  {answer.text}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      answer.followersChange > 0
                        ? "bg-green-500/10 text-green-700 border border-green-500/20"
                        : answer.followersChange < 0
                        ? "bg-red-500/10 text-red-700 border border-red-500/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="text-base">👥</span>
                    {answer.followersChange > 0 ? "+" : ""}
                    {answer.followersChange}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      answer.credibilityChange > 0
                        ? "bg-green-500/10 text-green-700 border border-green-500/20"
                        : answer.credibilityChange < 0
                        ? "bg-red-500/10 text-red-700 border border-red-500/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="text-base">✨</span>
                    {answer.credibilityChange > 0 ? "+" : ""}
                    {answer.credibilityChange}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
