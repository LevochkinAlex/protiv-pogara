import type { Metadata } from 'next'
import Script from 'next/script'
import { Onest } from 'next/font/google'
import { DeferredClientWidgets } from '@/components/layout/deferred-client-widgets'
import './globals.css'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
  display: 'swap',
  adjustFontFallback: true,
})

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://inpb.pro'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Институт НПБ - Противопожарная безопасность | Москва',
    template: '%s | Институт НПБ'
  },
  description: 'Институт национальной противопожарной безопасности — полный цикл услуг в Москве: аудит, проектирование и монтаж пожарной сигнализации, огнезащита, обучение ПТМ, паспорт безопасности, декларация ПБ, сопровождение проверок МЧС. Опыт 20+ лет.',
  keywords: [
    'пожарная безопасность Москва',
    'услуги пожарной безопасности Москва',
    'противопожарные услуги Москва',
    'пожарная безопасность под ключ',
    'обеспечение пожарной безопасности объектов',
    'аудит пожарной безопасности',
    'расчет пожарного риска',
    'монтаж пожарной сигнализации',
    'огнезащитная обработка Москва',
    'обучение ПТМ Москва',
    'паспорт безопасности объекта',
    'декларация пожарной безопасности',
    'сопровождение проверки МЧС',
    'пожарный аудит цена',
    'аутсорсинг пожарной безопасности',
  ],
  authors: [{ name: 'Институт НПБ' }],
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Институт НПБ',
    url: siteUrl,
    title: 'Пожарная безопасность под ключ в Москве — Институт НПБ',
    description: 'Аудит, проектирование и монтаж систем пожаротушения, огнезащита, обучение ПТМ, паспорт безопасности объекта, сопровождение проверок МЧС. 20+ лет опыта.',
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
    title: 'Пожарная безопасность под ключ в Москве — Институт НПБ',
    description: 'Аудит, монтаж пожарной сигнализации, огнезащита, обучение ПТМ, декларация ПБ. Москва и МО.',
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
  "description": "Пожарная безопасность под ключ в Москве и МО: аудит, проектирование, монтаж, огнезащита, обучение, паспорт безопасности, сопровождение проверок МЧС. 20+ лет.",
  "areaServed": "Москва и Московская область",
  "knowsAbout": [
    "пожарная безопасность",
    "аудит пожарной безопасности",
    "проектирование систем пожаротушения",
    "монтаж пожарной сигнализации",
    "огнезащитная обработка",
    "обучение ПТМ",
    "паспорт безопасности объекта",
    "декларация пожарной безопасности",
    "сопровождение проверки МЧС"
  ],
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
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X7KH81HKWN');
          `}
        </Script>
        <Script id="yandex-metrika" strategy="lazyOnload">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(108217653,"init",{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/108217653" style={{ position: 'absolute', left: '-9999px' }} alt="Яндекс.Метрика" width={1} height={1} />
          </div>
        </noscript>
        {children}
        <DeferredClientWidgets />
      </body>
    </html>
  )
}
