import Link from "next/link"
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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { services } from "@/lib/services-data"

const iconMap: Record<string, React.ReactNode> = {
  "shield-check": <ShieldCheck className="h-6 w-6" />,
  "settings": <Settings className="h-6 w-6" />,
  "calculator": <Calculator className="h-6 w-6" />,
  "map": <Map className="h-6 w-6" />,
  "flame": <Flame className="h-6 w-6" />,
  "clipboard-check": <ClipboardCheck className="h-6 w-6" />,
  "file-text": <FileText className="h-6 w-6" />,
  "award": <Award className="h-6 w-6" />,
  "graduation-cap": <GraduationCap className="h-6 w-6" />,
  "lightbulb": <Lightbulb className="h-6 w-6" />,
}

export function ServicesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Наши услуги
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Полный спектр услуг в области пожарной безопасности — от аудита и проектирования до обучения персонала и поставки оборудования
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <Link key={service.id} href={`/uslugi/${service.slug}`} className="group flex min-h-0">
              <Card className="flex h-full min-h-0 w-full flex-col gap-4 transition-all hover:border-primary/50 hover:shadow-lg">
                <CardHeader className="min-w-0 flex-1 px-6 pb-0 pt-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {iconMap[service.icon] || <ShieldCheck className="h-6 w-6" />}
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{service.shortTitle}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">
                    {service.description.substring(0, 100)}...
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto border-t border-border/60 px-6 pb-0 pt-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold tabular-nums text-primary whitespace-nowrap">
                      {service.price}
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
        
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/uslugi">
              Смотреть все услуги
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
