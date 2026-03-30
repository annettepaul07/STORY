import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meghamalai Estate Tea — Single Origin, Hand-Crafted',
  description: 'From the misty slopes of Meghamalai, where tea grows at 4,500 feet. Hand-plucked, artisan-crafted teas for those who seek the extraordinary.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Sacramento&family=Spectral:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
