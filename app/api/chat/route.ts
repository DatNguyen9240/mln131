import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Kiểm tra API key
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    console.log("Calling Gemini API...");
    // Sử dụng gemini-1.5-flash model (stable)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `Bạn là trợ lý AI thông minh, chuyên về chính trị Việt Nam, đặc biệt là về Dân chủ xã hội chủ nghĩa và Nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam. 
    
Nhiệm vụ của bạn:
- Trả lời các câu hỏi về dân chủ XHCN, nhà nước pháp quyền XHCN
- Giải thích các khái niệm chính trị một cách dễ hiểu
- Phân tích tác động của mạng xã hội đối với dân chủ
- Tư vấn cách thực hành dân chủ có trách nhiệm trên mạng xã hội

Hãy trả lời một cách:
- Chính xác, có căn cứ
- Dễ hiểu, phù hợp với sinh viên
- Khách quan và mang tính xây dựng
- Bằng tiếng Việt`;

    const result = await model.generateContent([
      systemPrompt,
      "\nCâu hỏi của người dùng: " + message,
    ]);
    
    const response = result.response;
    const text = response.text();

    console.log("Gemini response received successfully");
    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Trả về thông tin lỗi chi tiết hơn
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate response", details: errorMessage },
      { status: 500 }
    );
  }
}
