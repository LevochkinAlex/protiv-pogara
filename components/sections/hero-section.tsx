"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroCoverImage } from "@/components/layout/hero-cover-image"
import { Shield, Phone, CheckCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <HeroCoverImage
        src="/images/hero-bg.png"
        alt="Пожарная безопасность и защита объектов — Институт НПБ, Москва"
        objectPosition="50% 28%"
        priority
      />
      <div
        className="pointer-events-none absolute inset-0 bg-black/65"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-28">
        <div className="grid gap-12 items-start lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-12 lg:gap-y-8 lg:items-center">
          {/* Left Content — min-w-0 чтобы заголовок не вылезал во вторую колонку */}
          <div className="min-w-0 max-w-xl lg:max-w-none">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm text-primary-foreground">
              <Shield className="h-4 w-4" />
              <span>Лицензия МЧС • Страхование 5 млн ₽</span>
            </div>
            
            {/* w-min: ширина блока по заголовку; min-w-0 у <p> не раздувает flex по длинному слову в лиде */}
            <div className="mb-8 flex w-min max-w-full flex-col">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Институт национальной противопожарной безопасности
              </h1>
              <p className="min-w-0 w-full text-lg text-background/80 leading-relaxed">
                Более 20 лет защищаем объекты любой сложности — от школ и храмов до промышленных предприятий. 
                Полный цикл услуг: аудит, проектирование, монтаж, обучение.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/kontakty">
                  Получить консультацию
                </Link>
              </Button>
              <Button
                size="lg"
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
            
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>600+ объектов</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>20+ лет опыта</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Эксперты МЧС</span>
              </div>
            </div>
          </div>
          
          {/* Right Content — max-width ограничивает карточки, колонка grid auto не забирает место у заголовка */}
          <div className="grid min-w-0 w-full max-w-full grid-cols-1 gap-3 lg:max-w-[21rem] lg:gap-4 xl:max-w-xl xl:grid-cols-2 xl:gap-4 2xl:max-w-2xl">
            <div className="rounded-xl bg-background/10 p-5 backdrop-blur xl:p-6">
              <p className="text-4xl font-bold text-primary">600+</p>
              <p className="mt-2 text-background/80">Защищённых объектов по всей России</p>
            </div>
            <div className="rounded-xl bg-background/10 p-5 backdrop-blur xl:p-6">
              <p className="text-4xl font-bold text-primary">20+</p>
              <p className="mt-2 text-background/80">Лет профессионального опыта</p>
            </div>
            <div className="rounded-xl bg-background/10 p-5 backdrop-blur xl:p-6">
              <p className="text-4xl font-bold text-primary">100%</p>
              <p className="mt-2 text-background/80">Соответствие требованиям МЧС</p>
            </div>
            <div className="rounded-xl bg-background/10 p-5 backdrop-blur xl:p-6">
              <p className="text-4xl font-bold text-primary">5 млн ₽</p>
              <p className="mt-2 text-background/80">Страхование ответственности</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
