# Cập nhật database cho tên trùng và thời gian làm bài

Nếu bạn đã tạo bảng leaderboard trước đó, chạy SQL này:

```sql
-- Thêm cột duration_seconds
ALTER TABLE leaderboard ADD COLUMN duration_seconds INTEGER DEFAULT 0;

-- Thêm unique constraint cho player_name (nếu chưa có)
ALTER TABLE leaderboard ADD CONSTRAINT unique_player_name UNIQUE (player_name);

-- Thêm index cho duration
CREATE INDEX idx_leaderboard_duration ON leaderboard(duration_seconds ASC);

-- Thêm policy UPDATE nếu chưa có
CREATE POLICY "Anyone can update leaderboard"
  ON leaderboard FOR UPDATE
  USING (true);
```

**Lưu ý:** Nếu bạn đã có dữ liệu trùng tên trong database, bạn cần xóa dữ liệu cũ trước:

```sql
-- Xóa tất cả dữ liệu (nếu cần)
DELETE FROM leaderboard;

-- Sau đó mới chạy ALTER TABLE ở trên
```

## Cách hoạt động

- **Lần đầu chơi**: Tạo record mới với tên người chơi
- **Chơi lại với cùng tên**: 
  - Nếu điểm cao hơn → Cập nhật record
  - Nếu điểm thấp hơn → Giữ nguyên record cũ
- Mỗi tên chỉ có 1 record duy nhất trên bảng xếp hạng
