# 🎭 Trò Chơi Tin Giả - Hướng dẫn cài đặt

## Tính năng đã được thêm ✅

1. **Nhập tên người chơi**: User phải nhập tên trước khi bắt đầu chơi
2. **Trang bảng xếp hạng riêng**: Truy cập tại `/leaderboard`
3. **Tích hợp Supabase**: Lưu trữ và hiển thị kết quả game
4. **Điều hướng**: Nút xem bảng xếp hạng ở nhiều nơi trong game

## Cài đặt Supabase

### Bước 1: Tạo project Supabase
1. Truy cập https://supabase.com
2. Đăng ký/Đăng nhập tài khoản
3. Nhấn "New Project"
4. Chọn organization và điền thông tin project:
   - Name: hangman-game (hoặc tên bạn muốn)
   - Database Password: Tạo mật khẩu mạnh (lưu lại)
   - Region: Singapore (gần Việt Nam nhất)
5. Nhấn "Create new project" và đợi vài phút

### Bước 2: Tạo bảng leaderboard trong Supabase

1. Vào project vừa tạo
2. Chọn "SQL Editor" từ menu bên trái
3. Nhấn "New query"
4. Copy và paste đoạn SQL sau:

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

5. Nhấn "Run" để thực thi

### Bước 3: Lấy API keys

1. Vào "Settings" → "API" từ menu bên trái
2. Trong phần **Project API keys**, bạn sẽ thấy 2 keys:

   **a) anon public key:**
   - Có label "anon" hoặc "public"
   - Bắt đầu bằng `eyJ...` (rất dài, ~300 ký tự)
   - Dùng để đọc dữ liệu từ client
   
   **b) service_role key:**
   - Có label "service_role" 
   - Bắt đầu bằng `eyJ...` (rất dài, ~300 ký tự)
   - **Nằm BÊN DƯỚI anon key**
   - Có icon cảnh báo ⚠️ hoặc chữ "Secret"
   - Nhấn nút "Reveal" hoặc icon con mắt để hiển thị
   - ⚠️ **CỰC KỲ QUAN TRỌNG:** Key này có full quyền admin!

3. Copy cả 3 giá trị:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGci...` (key công khai)
   - **service_role key**: `eyJhbGci...` (key bí mật - khác với anon key!)

⚠️ **CẢNH BÁO BẢO MẬT:**
- Service role key có quyền **admin toàn bộ database**
- **KHÔNG BAO GIỜ** chia sẻ, commit lên Git, hoặc để lộ ra ngoài
- Chỉ dùng trên server (Next.js API routes)
- Nếu bị lộ, hãy "Revoke" và tạo key mới ngay!

### Bước 4: Cấu hình môi trường

1. Mở file `.env.local` ở thư mục gốc project (đã được tạo sẵn)
2. Thay thế các giá trị:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

3. Lưu file

⚠️ **BẢO MẬT:** File `.env.local` đã được thêm vào `.gitignore` - không bao giờ commit file này!

### Bước 5: Chạy ứng dụng

```bash
npm run dev
```

Truy cập http://localhost:3000

## Cách sử dụng

1. **Nhập tên**: Màn hình đầu tiên sẽ yêu cầu nhập tên (2-30 ký tự)
2. **Chơi game**: Trả lời 16 câu hỏi
3. **Kết quả tự động lưu**: Khi hoàn thành game, kết quả sẽ tự động lưu vào Supabase
4. **Xem bảng xếp hạng**: Nhấn nút "🏆 Xem bảng xếp hạng" ở bất kỳ đâu trong game

## Cấu trúc thay đổi

### Files mới được tạo:
- `lib/supabase.ts` - Các hàm tương tác với Supabase
- `lib/utils.ts` - Utility functions
- `components/NameInput.tsx` - Component nhập tên
- `components/ui/button.tsx` - Button component
- `components/ui/input.tsx` - Input component
- `app/leaderboard/page.tsx` - Trang bảng xếp hạng
- `.env.local` - File cấu hình môi trường

### Files đã được cập nhật:
- `app/page.tsx` - Thêm name input và navigation
- `hooks/useGameLogic.ts` - Thêm playerName state và lưu kết quả
- `components/GameSummary.tsx` - Thêm link đến leaderboard
- `components/GameOver.tsx` - Thêm link đến leaderboard

## Sắp xếp trên bảng xếp hạng

Người chơi được xếp hạng theo thứ tự:
1. **Badges Count** (nhiều nhất)
2. **Followers** (cao nhất)
3. **Credibility** (cao nhất)
4. **Thời gian làm bài** (nhanh hơn = tốt hơn - công bằng nhất!)

**Lưu ý:** Nếu 2 người có cùng điểm, người hoàn thành NHANH hơn sẽ được xếp hạng cao hơn.

### Ví dụ cụ thể:

**Trường hợp 1: So sánh huy hiệu**
- Người A: 8 huy hiệu, 10,000 followers, 100 credibility, 5 phút
- Người B: 10 huy hiệu, 5,000 followers, 80 credibility, 10 phút
→ **Người B xếp hạng 1** (10 huy hiệu > 8 huy hiệu)

**Trường hợp 2: Huy hiệu bằng nhau, so sánh Followers**
- Người A: 10 huy hiệu, 8,000 followers, 100 credibility, 5 phút
- Người B: 10 huy hiệu, 12,000 followers, 80 credibility, 10 phút
→ **Người B xếp hạng 1** (12,000 > 8,000 followers)

**Trường hợp 3: Huy hiệu và Followers bằng nhau, so sánh Credibility**
- Người A: 10 huy hiệu, 10,000 followers, 90 credibility, 5 phút
- Người B: 10 huy hiệu, 10,000 followers, 120 credibility, 10 phút
→ **Người B xếp hạng 1** (120 > 90 credibility)

**Trường hợp 4: Tất cả bằng nhau, so sánh thời gian**
- Người A: 10 huy hiệu, 10,000 followers, 100 credibility, **8 phút**
- Người B: 10 huy hiệu, 10,000 followers, 100 credibility, **5 phút**
→ **Người B xếp hạng 1** (5 phút < 8 phút - nhanh hơn!)

**Kết luận:** Để lên top, bạn cần:
1. Thu thập nhiều huy hiệu nhất có thể (quan trọng

## Bảo mật chống gian lận

### Các biện pháp bảo vệ đã được áp dụng:

1. **Server-side validation**: Điểm được xử lý qua API route, không gửi trực tiếp đến Supabase
2. **Data validation**: 
   - Kiểm tra giới hạn điểm (badges: 0-10, followers < 100k, credibility < 200)
   - Kiểm tra thời gian hợp lý (30s - 2h)
   - Yêu cầu phải hoàn thành đủ 16 câu hỏi
3. **Service Role Key**: Chỉ server mới có quyền ghi vào database
4. **Game history validation**: Kiểm tra lịch sử trả lời có tồn tại và hợp lệ

### Tại sao cần bảo mật?

**Trước khi có validation:**
- Ai cũng có thể mở DevTools → Network → Copy anon key
- Gửi request trực tiếp đến Supabase với điểm giả: `{ badges_count: 10, followers: 99999 }`
- Lên top 1 mà không cần chơi!

**Sau khi có validation:**
- Client chỉ gọi `/api/submit-score`
- Server kiểm tra dữ liệu hợp lệ mới cho lưu
- Service role key được giữ bí mật trên server
- Khó gian lận hơn nhiều!

**Lưu ý:** Không có hệ thống nào 100% chống được gian lận, nhưng validation này đủ cho hầu hết trường hợp. nhất!)
2. Tăng Followers cao
3. Giữ Credibility tốt
4. Hoàn thành nhanh để vượt qua người có cùng điểm

## Troubleshooting

### Lỗi "Cannot connect to Supabase"
- Kiểm tra lại URL và API key trong `.env.local`
- Đảm bảo đã chạy SQL để tạo bảng
- Kiểm tra policies đã được tạo đúng

### Bảng xếp hạng trống
- Hoàn thành ít nhất 1 game để có dữ liệu
- Kiểm tra Console trong DevTools xem có lỗi không

### Không lưu được kết quả
- Mở DevTools Console và kiểm tra lỗi
- Đảm bảo RLS policies đã được cấu hình đúng
- Kiểm tra INSERT policy có tồn tại

## Liên hệ & Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. Console logs trong browser (F12)
2. Supabase dashboard → Table Editor xem dữ liệu
3. Supabase dashboard → Logs xem errors

---

Chúc bạn vui vẻ! 🎮
