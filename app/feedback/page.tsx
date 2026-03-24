import { Metadata } from 'next'
import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FeedbackForm } from '@/components/forms/feedback-form'

export const metadata: Metadata = {
  title: 'Форма обратной связи',
  description: 'Свяжитесь с нами через форму обратной связи. Мы ответим на ваши вопросы в ближайшее время.',
  alternates: { canonical: '/feedback' },
  openGraph: { url: '/feedback' },
}

export default function FeedbackPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Форма обратной связи</h1>
              <p className="text-lg text-muted-foreground text-balance">
                Оставьте ваши данные и мы свяжемся с вами в ближайшее время
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-muted" />}>
              <FeedbackForm source="feedback" />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
