import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Be_Vietnam_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Tập làm người xấu - Mạng xã hội và Tin giả",
  description: "Trò chơi giáo dục về lan truyền tin giả và thao túng thông tin trên mạng xã hội tại Việt Nam.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo.webp",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.webp",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.webp",
        type: "image/webp",
      },
    ],
    apple: "/logo.webp",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
