import type { Metadata } from 'next'
import Script from 'next/script'
import { Onest } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ChatbotWidget } from '@/components/chat/chatbot-widget'
import './globals.css'

const onest = Onest({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-onest',
})

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://inpb.pro'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Институт НПБ - Противопожарная безопасность | Москва',
    template: '%s | Институт НПБ'
  },
  description: 'Институт национальной противопожарной безопасности - эксперты МЧС с 20-летним опытом. Аудит, проектирование, монтаж систем пожаротушения, обучение в Москве.',
  keywords: ['пожарная безопасность', 'аудит', 'проектирование СПС', 'огнезащита', 'МЧС', 'Москва'],
  authors: [{ name: 'Институт НПБ' }],
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Институт НПБ',
    url: siteUrl,
    title: 'Институт НПБ — противопожарная безопасность',
    description: 'Институт национальной противопожарной безопасности. Аудит, проектирование СПС, обучение ПТМ, Москва.',
    images: [
      {
        url: '/og.png',
        width: 1024,
        height: 537,
        alt: 'Институт национальной противопожарной безопасности — inpb.pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Институт НПБ — противопожарная безопасность',
    description: 'Институт национальной противопожарной безопасности. Аудит, проектирование СПС, Москва.',
    images: ['/og.png'],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Институт национальной противопожарной безопасности",
  "url": "https://inpb.pro",
  "logo": "https://inpb.pro/logo.png",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X7KH81HKWN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X7KH81HKWN');
          `}
        </Script>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(108217653,"init",{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/108217653" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        {children}
        <ChatbotWidget />
        <Analytics />
      </body>
    </html>
  )
}
