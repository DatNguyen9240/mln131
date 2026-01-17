"use client";

import Link from "next/link";
import { ChatBot } from "../components/Chatbot";
import { BookOpen, Brain, Scale, Users, AlertCircle, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  Dân chủ XHCN & Nhà nước pháp quyền
                </h1>
              </div>
              <nav className="flex items-center gap-4">
                <Link
                  href="/game"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  🎮 Trò chơi
                </Link>
                <Link
                  href="/leaderboard"
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
                >
                  🏆 Bảng xếp hạng
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Dân chủ xã hội chủ nghĩa
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                và Nhà nước pháp quyền
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tìm hiểu về bản chất, đặc điểm và vai trò của dân chủ xã hội chủ nghĩa
              cũng như Nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam hiện nay
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Dân chủ XHCN */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    I. Dân chủ xã hội chủ nghĩa ở Việt Nam
                  </h3>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                {/* Sự ra đời và phát triển */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    🏛️ Sự ra đời và phát triển
                  </h4>
                  <div className="pl-8 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">1945:</span>
                      <p className="text-gray-700">Sau Cách mạng Tháng Tám - hình thành nền dân chủ nhân dân</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">1976:</span>
                      <p className="text-gray-700">Xây dựng chế độ làm chủ tập thể XHCN</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">1986:</span>
                      <p className="text-gray-700">Đại hội VI đến nay - không ngừng đổi mới, hoàn thiện dân chủ, lấy dân làm gốc</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg mt-4">
                      <p className="text-gray-800 font-medium">
                        Dân chủ là bản chất của chế độ xã hội chủ nghĩa, vừa là mục tiêu, vừa là động lực phát triển đất nước
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bản chất */}
                <div className="space-y-4 border-t pt-6">
                  <h4 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-blue-600" />
                    Bản chất
                  </h4>
                  <div className="pl-8 space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-blue-600">Quyền lực thuộc về nhân dân:</strong> Nhân dân là chủ thể của quyền lực nhà nước
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-blue-600">Vừa là mục tiêu, vừa là động lực:</strong> Dân giàu, nước mạnh, dân chủ, công bằng, văn minh
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-blue-600">Gắn với pháp luật:</strong> Dân chủ phải đi đôi với kỷ luật và kỷ cương
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-blue-600">Hình thức thực hiện:</strong> Dân chủ trực tiếp và dân chủ gián tiếp
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-blue-600">Dưới sự lãnh đạo:</strong> Đảng Cộng sản Việt Nam và thông qua Nhà nước XHCN
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mt-4">
                      <p className="text-gray-800 italic">
                        "Nước ta là nước dân chủ, bao nhiêu lợi ích đều vì dân, bao nhiêu quyền hạn đều của dân"
                        <span className="block text-sm text-gray-600 mt-2">- Chủ tịch Hồ Chí Minh</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nhà nước pháp quyền */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6">
                <div className="flex items-center gap-3">
                  <Scale className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    II. Nhà nước pháp quyền xã hội chủ nghĩa
                  </h3>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                {/* Định nghĩa */}
                <div className="bg-indigo-50 p-5 rounded-lg">
                  <p className="text-gray-800 leading-relaxed">
                    Nhà nước pháp quyền XHCN ở Việt Nam là <strong>nhà nước của nhân dân, do nhân dân, vì nhân dân</strong>, 
                    trong đó pháp luật giữ vị trí tối thượng trong quản lý xã hội. Mọi cơ quan nhà nước, tổ chức, 
                    cán bộ, công chức và công dân đều hoạt động trong khuôn khổ Hiến pháp và pháp luật.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900">Quan niệm</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Thượng tôn pháp luật</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Bảo đảm phúc lợi và quyền tự do, bình đẳng</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Phân quyền và kiểm soát quyền lực</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Quyền lực thống nhất: lập pháp - hành pháp - tư pháp</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Lãnh đạo của Đảng Cộng sản Việt Nam</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900">Đặc điểm</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Nhà nước của nhân dân lao động</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Pháp luật giữ vai trò tối cao</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Quyền lực thống nhất, có phân công, phối hợp</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Giám sát "dân biết, dân bàn, dân làm, dân kiểm tra"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Tôn trọng quyền con người, quyền công dân</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Tổ chức theo nguyên tắc tập trung dân chủ</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Phát huy dân chủ và xây dựng nhà nước */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6">
                <div className="flex items-center gap-3">
                  <Scale className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    III. Phát huy dân chủ và xây dựng Nhà nước pháp quyền XHCN hiện nay
                  </h3>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-600">
                    <h4 className="text-lg font-semibold text-emerald-900 mb-4">
                      Phát huy dân chủ XHCN
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">1.</span>
                        <span>Hoàn thiện thể chế kinh tế thị trường định hướng XHCN</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">2.</span>
                        <span>Xây dựng Đảng Cộng sản Việt Nam trong sạch, vững mạnh</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">3.</span>
                        <span>Xây dựng Nhà nước pháp quyền XHCN vững mạnh</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">4.</span>
                        <span>Nâng cao vai trò Mặt trận Tổ quốc và các tổ chức chính trị - xã hội</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">5.</span>
                        <span>Hoàn thiện cơ chế giám sát, phản biện xã hội</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-teal-50 rounded-xl p-6 border-l-4 border-teal-600">
                    <h4 className="text-lg font-semibold text-teal-900 mb-4">
                      Xây dựng Nhà nước pháp quyền XHCN
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">1.</span>
                        <span>Kiên định sự lãnh đạo của Đảng đối với Nhà nước</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">2.</span>
                        <span>Đổi mới tổ chức và phương thức hoạt động của bộ máy nhà nước</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">3.</span>
                        <span>Xây dựng đội ngũ cán bộ, công chức có năng lực, phẩm chất đạo đức</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">4.</span>
                        <span>Đẩy mạnh phòng, chống tham nhũng, lãng phí, thực hành tiết kiệm</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Mạng xã hội và Dân chủ */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-700 p-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">
                    IV. Mạng xã hội và thực hành dân chủ
                  </h3>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h4 className="text-lg font-semibold text-green-900 mb-4">
                      ✅ Tác động tích cực
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li>• Mở rộng quyền tham gia của người dân</li>
                      <li>• Tăng cường giám sát và phản biện</li>
                      <li>• Thực hiện dân chủ nhanh và rộng rãi</li>
                      <li>• Phù hợp với "dân biết, dân bàn, dân làm, dân kiểm tra"</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h4 className="text-lg font-semibold text-red-900 mb-4">
                      ⚠️ Thách thức
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li>• Lan truyền tin giả, thông tin sai lệch</li>
                      <li>• Lợi dụng dân chủ để chống phá</li>
                      <li>• Phát ngôn thiếu trách nhiệm</li>
                      <li>• Ảnh hưởng đến trật tự xã hội</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">
                    💡 Sinh viên cần ứng xử như thế nào?
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>1.</strong> Nâng cao nhận thức chính trị và pháp luật</li>
                    <li><strong>2.</strong> Kiểm chứng thông tin trước khi chia sẻ</li>
                    <li><strong>3.</strong> Thể hiện chính kiến văn minh, xây dựng</li>
                    <li><strong>4.</strong> Tham gia phản biện xã hội có trách nhiệm</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-4">
                Trải nghiệm thực tế qua trò chơi
              </h3>
              <p className="text-xl mb-6 text-blue-100">
                Tham gia trò chơi giáo dục về tin giả và mạng xã hội để hiểu rõ hơn về thực hành dân chủ có trách nhiệm
              </p>
              <Link
                href="/game"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
              >
                🎮 Chơi ngay
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm">
              © 2026 - Tài liệu giáo dục về Dân chủ XHCN và Nhà nước pháp quyền tại Việt Nam
            </p>
          </div>
        </footer>
      </main>

      {/* ChatBot */}
      <ChatBot />
    </>
  );
}
