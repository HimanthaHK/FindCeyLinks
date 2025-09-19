import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'   // 👈 import footer
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CeyLinks - Find Your Dream Job',
  description: 'Discover job opportunities and advance your career',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script - Add your publisher ID when ready */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        
        <Navbar />

        {/* Content area grows to push footer down */}
        <main className="pt-16 flex-grow bg-gray-50 pb-12">
          {children}
        </main>

        {/* Footer always at the bottom */}
        <Footer />

      </body>
    </html>
  )
}
