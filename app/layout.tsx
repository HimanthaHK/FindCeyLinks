import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CeyLinks - Find Your Dream Job',
  description: 'Discover job opportunities and advance your career',
  icons: {
    icon: '/weblogo.ico',
    shortcut: '/weblogo.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/weblogo.ico" sizes="any" />
        <link rel="shortcut icon" href="/weblogo.ico" />
        <link rel="apple-touch-icon" href="/weblogo.ico" />
        <meta name="theme-color" content="#1A2F5F" />

        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />

        <main className="pt-16 flex-grow bg-gray-50 pb-12">
          {children}
        </main>

        {/* Ad only at the bottom */}
        <div className="px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
          <AdBanner />
        </div>

        <Footer />
      </body>
    </html>
  )
}
