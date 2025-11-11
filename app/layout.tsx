import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME || 'AI Blog',
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME || 'AI Blog'}`,
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'AI-powered blog with SEO optimization',
  keywords: ['blog', 'AI', 'SEO', 'content', 'writing'],
  authors: [{ name: 'Admin' }],
  creator: 'AI Blog Service',
  publisher: 'AI Blog Service',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'AI Blog',
    title: process.env.NEXT_PUBLIC_SITE_NAME || 'AI Blog',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'AI-powered blog with SEO optimization',
  },
  twitter: {
    card: 'summary_large_image',
    title: process.env.NEXT_PUBLIC_SITE_NAME || 'AI Blog',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'AI-powered blog with SEO optimization',
    creator: '@aiblog',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}