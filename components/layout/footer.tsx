import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { OfficeAddressMapDialog, OFFICE_ADDRESS_LINE } from "@/components/contact/office-address-map-card"
import { services } from "@/lib/services-data"
import { LogoMark } from "@/components/layout/logo-mark"

const quickLinks = [
  { name: "О компании", href: "/about" },
  { name: "Услуги", href: "/uslugi" },
  { name: "Блог", href: "/blog" },
  { name: "Контакты", href: "/kontakty" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <LogoMark />
              <div>
                <p className="text-sm font-semibold text-foreground">Институт НПБ</p>
                <p className="text-xs text-muted-foreground">Противопожарная безопасность</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Более 20 лет обеспечиваем пожарную безопасность объектов любой сложности. 
              Лицензия МЧС, страхование рисков.
            </p>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary mb-4 inline-block text-sm transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <div className="flex gap-4">
              <a 
                href="https://t.me/institut_npb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Telegram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/79299110346" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a 
                href="https://vk.com/institut_npb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="ВКонтакте"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.27-1.422 2.18-3.607 2.18-3.607.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Услуги</h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/uslugi/${service.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/uslugi"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Все услуги →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Навигация</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <OfficeAddressMapDialog>
                  <button
                    type="button"
                    aria-label={`Показать адрес на карте: ${OFFICE_ADDRESS_LINE}`}
                    className="hover:text-primary focus-visible:ring-ring group flex w-full items-start gap-3 rounded-md p-0 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <MapPin className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                    <span className="text-muted-foreground group-hover:text-primary text-sm">
                      {OFFICE_ADDRESS_LINE}
                    </span>
                  </button>
                </OfficeAddressMapDialog>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+74955320177" className="text-sm text-muted-foreground hover:text-primary">
                    +7 (495) 532-01-77
                  </a>
                  <a href="tel:+79299110346" className="text-sm text-muted-foreground hover:text-primary">
                    +7 (929) 911-03-46
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:institut-npb@mail.ru" className="text-sm text-muted-foreground hover:text-primary">
                  institut-npb@mail.ru
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Пн–Пт: 10:00–18:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col gap-4 items-center md:flex-row md:justify-between md:items-center">
          <p className="text-muted-foreground text-center text-sm md:text-left">
            © {new Date().getFullYear()} ООО «Институт НПБ». Все права защищены.
          </p>
          <a
            href="https://pr-cy.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 opacity-90 hover:opacity-100 transition-opacity"
            title="Рейтинг доверия и анализ сайта на PR-CY"
          >
            <img
              src="https://s.pr-cy.ru/counters/inpb.pro"
              width={88}
              height={31}
              alt="Анализ сайта"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
