import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ChatbotWidget } from '@/components/chat/chatbot-widget'
import './globals.css'

const onest = Onest({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-onest',
});

export const metadata: Metadata = {
  title: {
    default: 'Институт НПБ - Противопожарная безопасность | Москва',
    template: '%s | Институт НПБ'
  },
  description: 'Институт национальной противопожарной безопасности - эксперты МЧС с 20-летним опытом. Аудит, проектирование, монтаж систем пожаротушения, обучение в Москве.',
  keywords: ['пожарная безопасность', 'аудит', 'проектирование СПС', 'огнезащита', 'МЧС', 'Москва'],
  authors: [{ name: 'Институт НПБ' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Институт НПБ',
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Институт национальной противопожарной безопасности",
  "url": "https://protiv-pogara.ru",
  "logo": "https://protiv-pogara.ru/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Курсовой пер., 17 стр.1, офис 13",
    "addressLocality": "Москва",
    "postalCode": "109052",
    "addressCountry": "RU"
  },
  "telephone": ["+7 (495) 532-01-77", "+7 (929) 911-03-46"],
  "email": "institut-npb@mail.ru",
  "openingHours": "Mo-Fr 10:00-18:00",
  "description": "Институт национальной противопожарной безопасности — эксперты МЧС с 20-летним опытом. Аудит, проектирование, монтаж систем пожаротушения, обучение.",
  "areaServed": "Москва и Московская область",
  "sameAs": [
    "https://t.me/institut_npb",
    "https://vk.com/institut_npb"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${onest.variable} font-sans antialiased`}>
        {children}
        <ChatbotWidget />
        <Analytics />
      </body>
    </html>
  )
}
