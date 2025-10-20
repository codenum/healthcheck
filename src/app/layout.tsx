import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '내 손안의 보건실 - 태장고등학교',
  description: '학생들을 위한 디지털 헬스케어 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-6xl px-4">
          {children}
        </div>
      </body>
    </html>
  )
}