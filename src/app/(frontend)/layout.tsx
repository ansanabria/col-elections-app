import Script from 'next/script'
import { DM_Sans, EB_Garamond } from 'next/font/google'
import React from 'react'
import './globals.css'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  description:
    'Perfiles verificados de candidatos presidenciales en Colombia para comparar propuestas y trayectoria con enfoque neutral.',
  title: 'Elecciones Colombia',
}

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es" className={`${dmSans.variable} ${ebGaramond.variable}`}>
      <head>
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body>
        <main className="mx-auto min-h-screen max-w-7xl px-6 py-6 md:px-8 lg:px-12">
          <SiteHeader />
          {children}
          <SiteFooter />
        </main>
        <Analytics />
      </body>
    </html>
  )
}
