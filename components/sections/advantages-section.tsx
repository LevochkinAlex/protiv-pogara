import { Shield, Building2, LineChart, Scale, HeartHandshake, BadgeCheck } from "lucide-react"

const advantages = [
  {
    icon: Shield,
    title: "Честный аудит",
    description: "Проводим объективную оценку без навязывания лишних услуг. Вы платите только за реально необходимые работы."
  },
  {
    icon: Building2,
    title: "Уникальные объекты",
    description: "Опыт работы с храмами, музеями, историческими зданиями. Знаем специфику нестандартных объектов."
  },
  {
    icon: LineChart,
    title: "CRM-контроль",
    description: "Все этапы работы прозрачны. Вы видите статус выполнения через личный кабинет в любое время."
  },
  {
    icon: Scale,
    title: "Полная законность",
    description: "Работаем строго по лицензии МЧС. Все документы имеют юридическую силу для проверок."
  },
  {
    icon: HeartHandshake,
    title: "Сопровождение",
    description: "Не бросаем после сдачи работ. Консультируем, помогаем при проверках, устраняем замечания."
  },
  {
    icon: BadgeCheck,
    title: "Страхование",
    description: "Ответственность застрахована на 5 млн рублей. Вы защищены от финансовых рисков."
  }
]

export function AdvantagesSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Почему выбирают нас
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Институт НПБ — это команда профессионалов с опытом работы в МЧС и ведущих проектных организациях
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="flex gap-4 rounded-xl bg-card p-6 shadow-sm border border-border"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <advantage.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">{advantage.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
