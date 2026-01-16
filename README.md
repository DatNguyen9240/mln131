# 🎭 Game Thông Tin Sai Lệch Mạng Xã Hội

Một trò chơi mô phỏng về việc tạo và lan truyền thông tin trên mạng xã hội, với hệ thống mở khóa tiến trình và huy hiệu phức tạp.

## 🎮 Cách Chơi

Bạn đóng vai một người tạo nội dung trên mạng xã hội. Mỗi câu hỏi đưa ra một tình huống, bạn chọn cách phản ứng. Mỗi lựa chọn ảnh hưởng đến:

- **👥 Followers (F)**: Sức lan tỏa của bạn (bắt đầu: 100)
- **🛡️ Credibility (C)**: Độ tin cậy xã hội (bắt đầu: 70)

## 🎯 Mục Tiêu

### 🏆 Thắng Lớn (Rank S):
- Credibility ≥ 80 VÀ Followers ≥ 300
- Trở thành "Người Truyền Thông Mẫu Mực"

### ⚠️ Tránh Thua:
- **Game Over** nếu Credibility ≤ 5
- **Game Over** nếu Followers ≤ 0

## 📊 16 Câu Hỏi Chia 4 Giai Đoạn

### 🟢 Giai Đoạn 1: Khởi Tạo (Câu 1-4)
- **Mở**: Luôn luôn
- Làm quen với game, quyết định hướng đi ban đầu

### 🔵 Giai Đoạn 2: Tăng Trưởng (Câu 5-8)
- **Mở khi**: 
  - Câu 5-6: Followers ≥ 150
  - Câu 7-8: Followers ≥ 250
- Người chơi "lành" sẽ vào chậm

### 🟠 Giai Đoạn 3: Thao Túng (Câu 9-12)
- **Mở khi**:
  - Câu 9-10: Credibility ≤ 60
  - Câu 11-12: Credibility ≤ 40
- Chỉ người bắt đầu sa đà tin giả mới mở được

### 🔴 Giai Đoạn 4: Khủng Hoảng (Câu 13-16)
- **Mở khi**:
  - Câu 13-14: Hoàn thành 2 câu liên quan với lựa chọn thao túng
  - Câu 15-16: Đạt ít nhất 1 huy hiệu "earned by doing"

## 🏅 10 Huy Hiệu

### 🔴 Nhóm A: "Mở Khi Làm" (5 huy hiệu)
Hành vi tiêu cực, mở khóa câu 13-16:

1. **🎯 Trùm giật tít**: ≥4 đáp án giật gân + F≥300
2. **🌀 Kẻ bóp méo**: ≥3 đáp án xuyên tạc + C≤50
3. **😱 Thao túng dư luận**: 2 câu LIÊN TIẾP dùng cảm xúc sợ hãi
4. **🎭 Kẻ cơ hội**: Chọn trái đạo đức ≥3 câu
5. **💥 Đòn tấn công niềm tin**: C≤30 + F≥400

### 🟢 Nhóm B: "Mở Khi Chống Lại" (3 huy hiệu)
Hành vi tích cực, để phản tư cuối game:

6. **✅ Người kiểm chứng**: ≥4 lần từ chối tin chưa kiểm chứng
7. **🛡️ Trách nhiệm số**: ≤2 đáp án gây nhiễu
8. **🧠 Người tỉnh táo**: C≥80 đến cuối game

### 🟡 Nhóm C: Trung Tính (2 huy hiệu)
9. **⚖️ Hai mặt**: Có cả hành vi tốt & xấu (≥2 mỗi loại)
10. **👑 Người dẫn dắt**: F≥350, không bị sụp đổ

## 🎲 Cơ Chế Độc Đáo

### 🔓 Mở Khóa Động
- Không phải tất cả câu hỏi đều mở ngay
- Lựa chọn của bạn quyết định câu nào được mở
- Đi "lành" → ít câu mở → kết thúc sớm nhưng điểm cao
- Đi "xấu" → nhiều câu mở → nhiều rủi ro

### ⚠️ Game Over Sớm
- Nếu Credibility xuống ≤5: **SỤP ĐỔ HOÀN TOÀN**
- Nếu Followers xuống ≤0: **MẤT HẾT NGƯỜI THEO DÕI**
- Cảnh báo hiện khi C ≤ 10

### 📈 Hệ Thống Xếp Hạng
- **S**: Hoàn hảo - C≥80 + F≥300
- **A**: Xuất sắc - C≥70 + F≥200
- **B**: Khá - C≥50 + F≥150
- **C**: Trung bình - C≥30 hoặc F≥100
- **D**: Yếu - C≥15 hoặc F≥50
- **F**: Thất bại - C<15 + F<50

## 💡 Chiến Thuật

### 🏆 Để Đạt Rank S:
1. Chọn đáp án "Kiểm tra nguồn" (tag: verify)
2. Tránh đáp án giật gân/xuyên tạc
3. Xây dựng Credibility trước
4. Từ từ tăng Followers bền vững

### 😈 Để Khám Phá Hết 16 Câu:
1. Chọn đáp án giật gân để tăng Followers nhanh
2. Chấp nhận giảm Credibility (nhưng giữ >5)
3. Mở khóa giai đoạn 3-4
4. Thu thập huy hiệu "earned by doing"

### ⚖️ Chơi Cân Bằng:
1. Đủ Followers để mở giai đoạn 2
2. Giữ Credibility >60 để tránh giai đoạn 3
3. Kết thúc ở 8-12 câu với điểm khá

## 🎨 Tính Năng

- ✅ 16 câu hỏi với tình huống thực tế
- ✅ Hệ thống mở khóa tiến trình phức tạp
- ✅ 10 huy hiệu với điều kiện đa dạng
- ✅ Xếp hạng S-F dựa trên kết quả
- ✅ Game over sớm nếu vượt giới hạn
- ✅ UI hiện đại với Tailwind + shadcn/ui
- ✅ Hiển thị thay đổi chỉ số real-time
- ✅ Cảnh báo khi chỉ số nguy hiểm

## 🚀 Chạy Game

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## 📝 Ý Nghĩa Giáo Dục

Game này giúp người chơi:
- 🧠 Hiểu về cơ chế lan truyền thông tin sai lệch
- ⚖️ Cân nhắc giữa viral content vs. trách nhiệm xã hội
- 🎭 Trải nghiệm hậu quả của từng lựa chọn
- 💭 Phản tư về vai trò người tạo nội dung

---

**Lưu ý**: Không có đáp án "đúng tuyệt đối". Mỗi lựa chọn có trade-off riêng!
