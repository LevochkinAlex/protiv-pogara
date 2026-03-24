import { Metadata } from 'next'
import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroCoverImage } from '@/components/layout/hero-cover-image'
import { FeedbackForm } from '@/components/forms/feedback-form'
import { OfficeAddressMapCard } from '@/components/contact/office-address-map-card'
import { Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Контакты — заказать услуги пожарной безопасности в Москве',
  description: 'Свяжитесь с Институтом НПБ: телефон, email, адрес офиса в Москве. Закажите аудит, монтаж пожарной сигнализации, огнезащиту, обучение ПТМ, подготовку к проверке МЧС.',
  alternates: { canonical: '/kontakty' },
  openGraph: { url: '/kontakty' },
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-foreground py-12 text-background md:py-16">
          <HeroCoverImage
            src="/images/kontakty-hero.webp"
            alt="Контакты Института НПБ — офис и связь в Москве"
            objectPosition="center bottom"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/65"
            aria-hidden
          />
          <div className="container relative z-10 mx-auto px-4">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">Контакты</h1>
              <p className="text-balance text-lg text-background/80">
                Свяжитесь с нами любым удобным способом
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">Форма обратной связи</h2>
                <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-muted" />}>
                  <FeedbackForm source="kontakty" />
                </Suspense>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-8">Реквизиты</h2>
                
                <div className="space-y-6">
                  <OfficeAddressMapCard />

                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex gap-4">
                      <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Телефон</h3>
                        <a
                          href="tel:+74955320177"
                          className="text-primary hover:underline"
                        >
                          +7 (495) 532-01-77
                        </a>
                        <br />
                        <a
                          href="tel:+79299110346"
                          className="text-primary hover:underline"
                        >
                          +7 (929) 911-03-46
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex gap-4">
                      <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <a
                          href="mailto:institut-npb@mail.ru"
                          className="text-primary hover:underline"
                        >
                          institut-npb@mail.ru
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex gap-4">
                      <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Время работы</h3>
                        <p className="text-muted-foreground">
                          Пн–Пт: 10:00–18:00<br />
                          Сб–Вс: выходной<br />
                          <br />
                          <span className="text-sm">
                            Консультации доступны по предварительной записи
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-primary mb-2">Экстренная помощь</h3>
                  <p className="text-muted-foreground">
                    При возникновении чрезвычайной ситуации немедленно звоните в МЧС: <br />
                    <span className="font-semibold text-primary">112</span> или <span className="font-semibold text-primary">01</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
