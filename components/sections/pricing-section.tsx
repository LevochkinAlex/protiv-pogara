import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Консультация",
    price: "Бесплатно",
    description: "Первичная консультация по вопросам пожарной безопасности",
    features: [
      "Оценка текущего состояния",
      "Рекомендации по улучшению",
      "Ответы на вопросы",
      "Предварительный расчёт"
    ],
    cta: "Получить консультацию",
    href: "/kontakty",
    popular: false
  },
  {
    name: "Аудит объекта",
    price: "от 30 000 ₽",
    description: "Комплексная проверка пожарной безопасности",
    features: [
      "Выезд эксперта на объект",
      "Проверка документации",
      "Детальный отчёт",
      "Рекомендации по устранению",
      "Сопровождение исправлений"
    ],
    cta: "Заказать аудит",
    href: "/uslugi/audit-pozharnoj-bezopasnosti",
    popular: true
  },
  {
    name: "Под ключ",
    price: "от 100 000 ₽",
    description: "Полное обеспечение пожарной безопасности объекта",
    features: [
      "Аудит и проектирование",
      "Монтаж систем",
      "Документация",
      "Обучение персонала",
      "Сопровождение проверок",
      "Гарантийное обслуживание"
    ],
    cta: "Обсудить проект",
    href: "/kontakty",
    popular: false
  }
]

export function PricingSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Стоимость услуг
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Прозрачное ценообразование без скрытых платежей. Точная стоимость рассчитывается после осмотра объекта.
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                    Популярное
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <p className="mt-8 text-center text-sm text-muted-foreground">
          * Указанные цены являются ориентировочными. Точная стоимость зависит от площади объекта, его категории и объёма работ.
        </p>
      </div>
    </section>
  )
}
