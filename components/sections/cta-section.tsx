import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroCoverImage } from "@/components/layout/hero-cover-image"
import { Phone, MessageCircle } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 text-background">
      <HeroCoverImage
        src="/images/cta-hero.png"
        alt="Консультация по противопожарной защите зданий — фоновая иллюстрация"
        objectPosition="50% 28%"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-black/65"
        aria-hidden
      />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Готовы обеспечить безопасность вашего объекта?
          </h2>
          <p className="mb-8 text-lg text-background/80 leading-relaxed">
            Свяжитесь с нами для бесплатной консультации. Наши эксперты ответят на все вопросы 
            и помогут подобрать оптимальное решение для вашего объекта.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/kontakty">
                <MessageCircle className="mr-2 h-5 w-5" />
                Оставить заявку
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-background/40 bg-transparent text-background shadow-none hover:bg-background/15 hover:text-background [&_svg]:text-background"
              asChild
            >
              <a href="tel:+74955320177">
                <Phone className="mr-2 h-5 w-5" />
                +7 (495) 532-01-77
              </a>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-background/60">
            Мы перезвоним в течение 15 минут в рабочее время
          </p>
        </div>
      </div>
    </section>
  )
}
