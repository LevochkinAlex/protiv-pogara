import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, 
  Settings, 
  Calculator, 
  Map, 
  Flame, 
  ClipboardCheck, 
  FileText, 
  Award, 
  GraduationCap, 
  Lightbulb,
  ArrowRight
} from "lucide-react"
import { services } from "@/lib/services-data"

export const metadata: Metadata = {
  title: "Услуги",
  description: "Полный спектр услуг в области пожарной безопасности: аудит, проектирование, монтаж систем, огнезащита, обучение персонала. Институт НПБ, Москва."
}

const iconMap: Record<string, React.ReactNode> = {
  "shield-check": <ShieldCheck className="h-8 w-8" />,
  "settings": <Settings className="h-8 w-8" />,
  "calculator": <Calculator className="h-8 w-8" />,
  "map": <Map className="h-8 w-8" />,
  "flame": <Flame className="h-8 w-8" />,
  "clipboard-check": <ClipboardCheck className="h-8 w-8" />,
  "file-text": <FileText className="h-8 w-8" />,
  "award": <Award className="h-8 w-8" />,
  "graduation-cap": <GraduationCap className="h-8 w-8" />,
  "lightbulb": <Lightbulb className="h-8 w-8" />,
}

export default function ServicesPage() {
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
              <span>Услуги</span>
            </nav>
            <h1 className="text-4xl font-bold md:text-5xl">
              Наши услуги
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-background/80">
              Полный комплекс услуг по обеспечению пожарной безопасности объектов любой сложности
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link key={service.id} href={`/uslugi/${service.slug}`} className="group flex min-h-0">
                  <Card className="flex h-full min-h-0 w-full flex-col gap-4 transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardHeader className="min-w-0 flex-1 px-6 pb-0 pt-0">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        {iconMap[service.icon] || <ShieldCheck className="h-8 w-8" />}
                      </div>
                      <CardTitle className="line-clamp-2 text-xl transition-colors group-hover:text-primary">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto border-t border-border/60 px-6 pb-0 pt-4">
                      <div className="flex flex-col gap-2">
                        <Badge
                          variant="secondary"
                          className="w-fit max-w-full whitespace-nowrap text-base font-semibold tabular-nums"
                        >
                          {service.price}
                        </Badge>
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

        {/* CTA */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Не нашли нужную услугу?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Свяжитесь с нами, и мы подберём оптимальное решение для вашего объекта
            </p>
            <Link 
              href="/kontakty" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Получить консультацию
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      
    </>
  )
}
