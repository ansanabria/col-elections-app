import Script from 'next/script'
import { DM_Sans, Instrument_Serif } from 'next/font/google'
import React from 'react'
import './globals.css'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'

export const metadata = {
  description:
    'Perfiles verificados de candidatos presidenciales en Colombia para comparar propuestas y trayectoria con enfoque neutral.',
  title: 'Elecciones Colombia',
}

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es">
      <head>
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={`${dmSans.variable} ${instrumentSerif.variable}`}>
        <main className="mx-auto min-h-screen max-w-7xl px-6 py-6 md:px-8 lg:px-12">
          <SiteHeader />
          {children}
          <SiteFooter />
        </main>
      </body>
    </html>
  )
}
