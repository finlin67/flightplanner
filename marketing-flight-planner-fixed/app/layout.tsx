import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marketing Flight Planner',
  description: 'Chart your marketing maturity journey and reach your strategic destination',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.className} bg-background text-foreground min-h-screen`}>
        <div className="flex flex-col min-h-screen">{children}</div>
      </body>
    </html>
  )
}
