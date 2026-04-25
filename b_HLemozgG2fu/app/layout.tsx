import type { Metadata } from 'next'
import { Rajdhani, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const rajdhani = Rajdhani({ 
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700']
})
const jetBrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono',
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: '田一的个人主页',
  description: '个人作品集，包含学术文章、个人随笔和独立创作',
  generator: 'Next.js',
  keywords: ['个人主页', '作品集', '学术', '随笔', '创作'],
  openGraph: {
    title: '田一的个人主页',
    description: '个人作品集，包含学术文章、个人随笔和独立创作',
    type: 'website',
    locale: 'zh_CN',
  },
  icons: {
    icon: [
      {
        url: '/tianyi-avatar.png',
        type: 'image/png',
      },
    ],
    apple: '/tianyi-avatar.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${rajdhani.variable} ${jetBrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
