import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cerevyn - Multilingual PDF Voice Translator',
  description: 'AI-powered multilingual PDF and textbook voice translator with natural TTS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

