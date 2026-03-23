import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Check, Phone, ArrowRight } from "lucide-react"
import { services, getServiceBySlug, getAllServiceSlugs } from "@/lib/services-data"
import { FeedbackForm } from "@/components/forms/feedback-form"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  
  if (!service) {
    return { title: "Услуга не найдена" }
  }
  
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  
  if (!service) {
    notFound()
  }

  // Get related services (excluding current)
  const relatedServices = services
    .filter(s => s.id !== service.id)
    .slice(0, 3)

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-foreground text-background py-16">
          <div className="container mx-auto px-4">
            <nav className="mb-4 text-sm text-background/60">
              <Link href="/" className="hover:text-background">Главная</Link>
              <span className="mx-2">/</span>
              <Link href="/uslugi" className="hover:text-background">Услуги</Link>
              <span className="mx-2">/</span>
              <span>{service.shortTitle}</span>
            </nav>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl text-balance">
              {service.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-background/80 leading-relaxed">
              {service.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Badge className="text-lg px-4 py-2 bg-primary text-primary-foreground">
                {service.price}
              </Badge>
              <Button
                variant="outline"
                className="border-background/40 bg-transparent text-background shadow-none hover:bg-background/15 hover:text-background [&_svg]:text-background"
                asChild
              >
                <a href="tel:+74955320177">
                  <Phone className="mr-2 h-4 w-4" />
                  +7 (495) 532-01-77
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Left Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Features */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Что входит в услугу</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {service.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 rounded-lg border border-border p-4"
                      >
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Как мы работаем</h2>
                  <div className="space-y-4">
                    {service.process.map((step) => (
                      <div 
                        key={step.step}
                        className="flex gap-4 items-start"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                          {step.step}
                        </div>
                        <div className="pt-1">
                          <h3 className="font-semibold text-foreground">{step.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Частые вопросы</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {service.faq.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Form Card */}
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Заказать услугу</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Оставьте заявку, и мы свяжемся с вами в течение 15 минут
                    </p>
                  </CardHeader>
                  <CardContent>
                    <FeedbackForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Другие услуги</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedServices.map((related) => (
                <Link key={related.id} href={`/uslugi/${related.slug}`} className="group flex min-h-0">
                  <Card className="flex h-full min-h-0 w-full flex-col gap-4 transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardHeader className="min-w-0 flex-1 px-6 pb-0 pt-0">
                      <CardTitle className="line-clamp-2 text-lg transition-colors group-hover:text-primary">
                        {related.shortTitle}
                      </CardTitle>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {related.description.substring(0, 100)}...
                      </p>
                    </CardHeader>
                    <CardContent className="mt-auto border-t border-border/60 px-6 pb-0 pt-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-base font-semibold tabular-nums text-primary whitespace-nowrap">
                          {related.price}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors group-hover:text-primary">
                          Подробнее
                          <ArrowRight className="size-4 shrink-0" aria-hidden />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
    </>
  )
}
