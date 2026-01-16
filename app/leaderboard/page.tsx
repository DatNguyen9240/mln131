"use client";

import { useEffect, useState } from "react";
import { getLeaderboard, LeaderboardEntry, isSupabaseConfigured } from "@/lib/supabase";
import Link from "next/link";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        setIsConfigured(false);
        setLoading(false);
        return;
      }

      try {
        const result = await getLeaderboard(100);
        if (result.success && result.data) {
          setLeaderboard(result.data);
        } else {
          setError("Không thể tải bảng xếp hạng");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();

    // Set up realtime subscription for automatic updates
    if (isSupabaseConfigured()) {
      const { subscribeToLeaderboard } = require("@/lib/supabase");
      const unsubscribe = subscribeToLeaderboard((newData: LeaderboardEntry) => {
        setLeaderboard((prev) => {
          // Check if player already exists
          const existingIndex = prev.findIndex(
            (entry) => entry.player_name === newData.player_name
          );

          let updated;
          if (existingIndex >= 0) {
            // Update existing player
            updated = [...prev];
            updated[existingIndex] = newData;
          } else {
            // Add new player
            updated = [...prev, newData];
          }

          // Re-sort by badges desc, then followers desc, then credibility desc, then duration asc (faster = better)
          return updated.sort((a, b) => {
            if (b.badges_count !== a.badges_count)
              return b.badges_count - a.badges_count;
            if (b.followers !== a.followers) return b.followers - a.followers;
            if (b.credibility !== a.credibility) return b.credibility - a.credibility;
            // Thời gian ít hơn (nhanh hơn) lên trước
            return a.duration_seconds - b.duration_seconds;
          });
        });
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            🏆 Bảng Xếp Hạng
          </h1>
          <p className="text-lg text-muted-foreground">
            Top người chơi có số Huy hiệu cao nhất
          </p>
        </div>

        {/* Back to game button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            ← Quay lại trò chơi
          </Link>
        </div>

        {/* Leaderboard */}
        <div className="bg-card border-2 border-border rounded-2xl overflow-hidden shadow-lg">
          {!isConfigured ? (
            <div className="p-12 text-center space-y-4">
              <div className="text-5xl mb-4">⚙️</div>
              <h2 className="text-2xl font-bold text-foreground">
                Cấu hình Supabase không hợp lệ
              </h2>
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4 max-w-2xl mx-auto text-left">
                <p className="font-semibold text-destructive mb-2">⚠️ Lỗi cấu hình:</p>
                <p className="text-sm text-foreground">
                  API Key trong file .env.local không đúng định dạng. 
                  Supabase anon key phải là một JWT token rất dài (hơn 100 ký tự) và bắt đầu bằng <code className="bg-muted px-1 rounded">eyJ</code>
                </p>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Vui lòng xem file <code className="bg-muted px-2 py-1 rounded">SETUP_GUIDE.md</code> để biết hướng dẫn chi tiết.
              </p>
              <div className="pt-4">
                <ol className="text-left max-w-xl mx-auto space-y-3 text-sm">
                  <li className="flex gap-2">
                    <span className="font-bold">1.</span>
                    <div>
                      <div>Vào project Supabase của bạn</div>
                      <div className="text-muted-foreground">Settings → API</div>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">2.</span>
                    <div>
                      <div>Copy <strong>Project URL</strong></div>
                      <code className="text-xs bg-muted px-2 py-1 rounded block mt-1">
                        https://xxxxx.supabase.co
                      </code>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">3.</span>
                    <div>
                      <div>Copy <strong>anon public</strong> key (dài ~300 ký tự)</div>
                      <code className="text-xs bg-muted px-2 py-1 rounded block mt-1 break-all">
                        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                      </code>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">4.</span>
                    <div>
                      <div>Dán vào file <code>.env.local</code></div>
                      <div className="text-xs text-destructive mt-1">⚠️ Khởi động lại server sau khi sửa!</div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          ) : loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground">Đang tải...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-destructive text-lg">{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Vui lòng kiểm tra kết nối hoặc cấu hình Supabase
              </p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-lg text-muted-foreground">
                Chưa có ai hoàn thành game
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Hãy là người đầu tiên!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b-2 border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                      Hạng
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-foreground">
                      Tên người chơi
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-foreground">
                      Huy hiệu
                      <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                        Ưu tiên
                      </span>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-foreground">
                      Followers
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-foreground">
                      Credibility
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-foreground">
                      Thời gian
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-foreground">
                      Ngày chơi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leaderboard.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className={`hover:bg-muted/50 transition-colors ${
                        index < 3 ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {index === 0 && (
                            <span className="text-2xl">🥇</span>
                          )}
                          {index === 1 && (
                            <span className="text-2xl">🥈</span>
                          )}
                          {index === 2 && (
                            <span className="text-2xl">🥉</span>
                          )}
                          {index > 2 && (
                            <span className="text-lg font-semibold text-muted-foreground">
                              {index + 1}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-foreground">
                          {entry.player_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-full font-semibold">
                          🏆 {entry.badges_count}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full font-semibold">
                          👥 {entry.followers.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full font-semibold">
                          ✓ {entry.credibility}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full font-semibold">
                          ⏱️ {Math.floor(entry.duration_seconds / 60)}:{String(entry.duration_seconds % 60).padStart(2, '0')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        {new Date(entry.completed_at).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-muted-foreground">
              Cập nhật realtime - Bảng xếp hạng tự động refresh khi có người hoàn thành game
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
