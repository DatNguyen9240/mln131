# Hướng dẫn thiết lập Supabase

## Bước 1: Tạo project trên Supabase
1. Truy cập https://supabase.com
2. Đăng ký/Đăng nhập tài khoản
3. Tạo project mới

## Bước 2: Tạo bảng leaderboard
Vào SQL Editor và chạy câu lệnh sau:

```sql
-- Tạo bảng leaderboard
CREATE TABLE leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL UNIQUE,
  followers INTEGER NOT NULL,
  credibility INTEGER NOT NULL,
  badges_count INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_seconds INTEGER NOT NULL,
  game_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index để tối ưu hiệu suất
CREATE INDEX idx_leaderboard_followers ON leaderboard(followers DESC);
CREATE INDEX idx_leaderboard_badges ON leaderboard(badges_count DESC);
CREATE INDEX idx_leaderboard_duration ON leaderboard(duration_seconds ASC);
CREATE INDEX idx_leaderboard_player ON leaderboard(player_name);

-- Enable Row Level Security (RLS)
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép mọi người đọc
CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard FOR SELECT
  USING (true);

-- Tạo policy cho phép mọi người thêm kết quả
CREATE POLICY "Anyone can insert leaderboard"
  ON leaderboard FOR INSERT
  WITH CHECK (true);

-- Tạo policy cho phép mọi người cập nhật kết quả
CREATE POLICY "Anyone can update leaderboard"
  ON leaderboard FOR UPDATE
  USING (true);
```

## Bước 3: Cấu hình môi trường
1. Vào Settings -> API trong project Supabase
2. Copy `Project URL` và `anon public key`
3. Cập nhật file `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## Bước 4: Chạy ứng dụng
```bash
npm run dev
```

Xong! Giờ bạn có thể test game với leaderboard.
