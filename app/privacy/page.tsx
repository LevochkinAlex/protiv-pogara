import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности и обработки персональных данных ООО «Институт НПБ».',
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-foreground py-16 text-background">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-[50%_28%] bg-no-repeat"
            style={{ backgroundImage: "url(/images/privacy-hero.png)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/65"
            aria-hidden
          />
          <div className="container relative z-10 mx-auto px-4">
            <h1 className="text-4xl font-bold md:text-5xl">
              Политика конфиденциальности
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-background/80">
              Обработка и защита персональных данных
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="prose prose-lg max-w-3xl mx-auto">
              <div className="space-y-8 text-muted-foreground">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">1. Общие положения</h2>
                  <p className="leading-relaxed">
                    Настоящая политика конфиденциальности определяет порядок обработки и защиты
                    информации о физических лицах, пользующихся услугами сайта protiv-pogara.ru
                    (далее — Сайт), принадлежащего ООО «Институт НПБ» (далее — Оператор).
                  </p>
                  <p className="leading-relaxed mt-3">
                    Предоставляя свои персональные данные при заполнении форм на Сайте, Пользователь
                    выражает согласие на их обработку в соответствии с настоящей Политикой.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">2. Собираемые данные</h2>
                  <p className="leading-relaxed">Оператор может собирать следующие персональные данные:</p>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    <li>Имя и фамилия</li>
                    <li>Номер телефона</li>
                    <li>Адрес электронной почты</li>
                    <li>Наименование организации</li>
                    <li>Текст обращения (сообщение)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">3. Цели обработки</h2>
                  <p className="leading-relaxed">Персональные данные обрабатываются в целях:</p>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    <li>Обработки входящих заявок и обращений</li>
                    <li>Связи с Пользователем для предоставления консультаций</li>
                    <li>Предоставления информации об услугах Оператора</li>
                    <li>Улучшения качества обслуживания</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">4. Защита данных</h2>
                  <p className="leading-relaxed">
                    Оператор принимает необходимые организационные и технические меры для защиты
                    персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения.
                    Передача данных осуществляется по защищённым каналам связи (SSL/TLS).
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">5. Права пользователя</h2>
                  <p className="leading-relaxed">
                    Пользователь вправе запросить информацию об обработке своих данных, потребовать
                    их исправления или удаления, обратившись по адресу электронной почты:{' '}
                    <a href="mailto:institut-npb@mail.ru" className="text-primary hover:underline">
                      institut-npb@mail.ru
                    </a>.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">6. Контакты оператора</h2>
                  <p className="leading-relaxed">
                    ООО «Институт НПБ»<br />
                    Адрес: Москва, Курсовой пер., 17 стр.1, офис 13<br />
                    Телефон: +7 (495) 532-01-77<br />
                    Email: institut-npb@mail.ru
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
