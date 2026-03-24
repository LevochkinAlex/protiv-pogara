import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroCoverImage } from '@/components/layout/hero-cover-image'
import { Award, Users, Clock, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'О компании — эксперты по пожарной безопасности в Москве',
  description: 'Институт НПБ — команда экспертов МЧС с 20-летним опытом. Пожарная безопасность под ключ, аутсорсинг пожарной безопасности, ведение ПБ организации в Москве.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  const achievements = [
    {
      icon: Award,
      title: '20+ лет опыта',
      description: 'Более двух десятилетий работы в сфере противопожарной безопасности',
    },
    {
      icon: Users,
      title: 'Команда экспертов',
      description: 'Сертифицированные специалисты и инженеры МЧС',
    },
    {
      icon: Target,
      title: '100% соответствие',
      description: 'Все проекты соответствуют современным нормам и требованиям',
    },
    {
      icon: Clock,
      title: 'Пунктуальность',
      description: 'Мы всегда придерживаемся установленных сроков',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-foreground py-12 text-background md:py-16">
          <HeroCoverImage
            src="/images/about-hero.webp"
            alt="О компании Институт НПБ — команда и экспертиза в пожарной безопасности"
            objectPosition="center bottom"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/65"
            aria-hidden
          />
          <div className="container relative z-10 mx-auto px-4">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">О нас</h1>
              <p className="text-balance text-lg text-background/80">
                Ваши партнёры в обеспечении пожарной безопасности
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Кто мы?</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Институт Национальной Противопожарной Безопасности (Институт НПБ) - это команда высокопрофессиональных специалистов, которые на протяжении более 20 лет помогают предприятиям, учреждениям и организациям обеспечить безопасность своих сотрудников и имущества.
                </p>
                <p className="text-lg text-muted-foreground">
                  Мы работаем со всеми типами объектов: от малых предприятий до крупных промышленных комплексов, от государственных учреждений до частных компаний. Наша миссия - создать безопасную среду для жизни и работы людей.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Наша история</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Компания была основана опытными специалистами, работавшими в структурах МЧС России. С самого начала мы ставили перед собой амбициозную цель — сделать пожарную безопасность доступной и понятной для всех.
                </p>
                <p className="text-lg text-muted-foreground">
                  За годы работы мы реализовали более 600 проектов, обучили тысячи сотрудников, провели аудиты для ведущих компаний страны. Среди наших клиентов — храмы, музеи, промышленные предприятия и государственные учреждения.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Наши ценности</h2>
                <ul className="space-y-3 text-lg text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>Профессионализм</strong> - все наши специалисты имеют необходимые сертификаты и постоянно повышают квалификацию</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>Ответственность</strong> - мы несем полную ответственность за качество выполненных работ</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>Прозрачность</strong> - мы честны с нашими клиентами и предоставляем полную информацию о стоимости и сроках</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>Инновация</strong> - мы постоянно внедряем новые технологии и методы в нашей работе</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Почему выбирают нас?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Статистика</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">600+</div>
                <p className="text-muted-foreground">Защищённых объектов</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2000+</div>
                <p className="text-muted-foreground">Обучено специалистов</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Соответствие нормам</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <p className="text-muted-foreground">Лет опыта</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
