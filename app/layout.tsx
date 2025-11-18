import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meta Campaign Logo Generator',
  description: 'AI-powered logo generator for Facebook and Instagram campaigns',
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
