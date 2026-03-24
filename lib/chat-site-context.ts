import { services } from '@/lib/services-data'

/** Сжатый каталог сайта для системного промпта чата (актуальные цены из services-data) */
export function buildChatSiteContext(): string {
  const serviceLines = services.map(
    (s) =>
      `• ${s.title} — ${s.price}. Страница: /uslugi/${s.slug}. ${s.description}`,
  )

  return [
    'Сайт inpb.pro — разделы:',
    'Главная: /',
    'Список услуг: /uslugi',
    'О компании: /about',
    'Блог: /blog',
    'Контакты и форма заявки: /kontakty',
    'Политика конфиденциальности: /privacy',
    '',
    'Услуги и ориентиры по стоимости (в промпте для бота всегда формулировать только «от», см. правила):',
    ...serviceLines,
  ].join('\n')
}
