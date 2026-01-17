# Hướng dẫn thiết lập Gemini Chatbot

## Bước 1: Lấy API Key từ Google AI Studio

1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập bằng tài khoản Google
3. Nhấn "Create API Key" để tạo key mới
4. Sao chép API key vừa tạo

## Bước 2: Cấu hình môi trường

1. Tạo file `.env.local` trong thư mục gốc của project
2. Thêm dòng sau vào file:

```
GEMINI_API_KEY=your_api_key_here
```

3. Thay `your_api_key_here` bằng API key bạn vừa sao chép

## Bước 3: Chạy ứng dụng

```bash
npm run dev
```

## Tính năng đã hoàn thành

✅ Trang chủ hiển thị thông tin về Dân chủ XHCN và Nhà nước pháp quyền
✅ Header với nút dẫn đến trò chơi và bảng xếp hạng
✅ Nút chatbot tròn nổi ở góc phải màn hình
✅ Chatbot sử dụng Gemini AI để trả lời câu hỏi
✅ Giao diện responsive, đẹp mắt

## Cấu trúc thư mục

- `/app/page.tsx` - Trang chủ mới với nội dung XHCN
- `/app/game/page.tsx` - Trang trò chơi (chuyển từ trang chủ cũ)
- `/app/api/chat/route.ts` - API endpoint cho chatbot
- `/components/ChatBot.tsx` - Component chatbot nổi

## Lưu ý

- Gemini API key là miễn phí với giới hạn sử dụng hợp lý
- Không commit file `.env.local` lên Git
- Chatbot được tối ưu để trả lời về chủ đề Dân chủ XHCN và Nhà nước pháp quyền
