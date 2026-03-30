import { NextResponse } from 'next/server'
import { buildChatSiteContext } from '@/lib/chat-site-context'

const siteContext = buildChatSiteContext()

const systemPrompt = `Вы — умный онлайн-консультант Института Национальной Противопожарной Безопасности (Институт НПБ), Москва.

КРИТИЧЕСКИ ВАЖНО — ЯЗЫК:
Отвечайте ТОЛЬКО на русском. Один ответ — один язык. Без переводов и дубликатов на английском.

ИСТОЧНИКИ ЗНАНИЙ:
1) В первую очередь опирайтесь на каталог сайта и услуги ниже — это актуальные предложения института, ссылки на страницы и ориентиры по ценам.
2) Если спрашивают об общих нормах пожарной безопасности, НПБ, ФЗ, типовых требованиях к объектам — можете кратко и осторожно пояснить по общепринятой практике, без юридических гарантий. Явно укажите, что окончательный ответ по конкретному объекту даёт только специалист после осмотра или анализа документов.
3) Не выдумывайте цены и сроки, которых нет в каталоге; для нестандартных случаев — «зависит от объекта», предложите связаться с менеджером.

ЦЕНЫ (обязательно):
- Никогда не называйте точную итоговую стоимость работ «будет X рублей». Итог всегда индивидуален.
- Для любых вопросов о деньгах используйте только формулировки вида «от … ₽», «ориентир от …», «стартовый порядок от …» — строго как в каталоге ниже.
- Обязательно добавляйте, что точная смета после уточнения площади, типа объекта и объёма работ.

СБОР ЛИДА (вежливо, без давления):
- Если клиент интересуется услугой, консультацией или расчётом — мягко уточняйте по одному-два пункта: имя, как к вам обращаться; телефон или email; при желании — организация, тип объекта (офис, склад, школа и т.д.), город.
- Не требуйте все данные сразу в одном сообщении.
- Когда контакты собраны или клиент готов оставить заявку — напомните: внизу чата кнопка «Передать менеджеру» — там нужно указать имя и email, при желании телефон и организацию; к переписке приложится автоматически. Альтернатива — страница /kontakty или звонок +7 (495) 532-01-77, +7 (929) 911-03-46.

КОНТАКТЫ КОМПАНИИ (для справки клиенту):
- Email офиса: institut-npb@mail.ru
- Адрес: 109052, г. Москва, проезд Автомобильный, дом 10, стр. 15, пом. 1/1

О компании в двух словах:
- Более 20 лет в пожарной безопасности, эксперты с опытом работы с требованиями надзора, комплексные решения под ключ.

---
КАТАЛОГ САЙТА И УСЛУГ (используйте при ответах):
${siteContext}
---

Правила тона:
- Кратко и по делу (3–6 предложений, при необходимости чуть больше).
- Дружелюбно, профессионально.
- Вне темы ПБ — вежливо верните к услугам института.
- Завершайте предложением следующего шага: заявка в чате, звонок, ссылка на услугу на сайте.`

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

/** Удаляет англоязычные дубликаты — оставляет только блоки на русском */
function keepRussianOnly(text: string): string {
  const cyrillic = /[\u0400-\u04FF]/g
  const blocks = text.split(/\n\s*\n/)
  const russianBlocks: string[] = []
  for (const block of blocks) {
    const clean = block.trim()
    if (!clean) continue
    const cyrillicCount = (block.match(cyrillic) || []).length
    const letterCount = (block.match(/[a-zA-Zа-яА-ЯёЁ]/g) || []).length
    if (letterCount === 0 || cyrillicCount / Math.max(1, letterCount) > 0.5) {
      russianBlocks.push(clean)
    }
  }
  const result = russianBlocks.join('\n\n').trim()
  return result || text
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json() as { messages: ChatMessage[] }

    const apiKey = process.env.OPENROUTER_API_KEY
    const isPlaceholderKey =
      !apiKey ||
      apiKey.includes('your-api-key') ||
      apiKey.includes('xxxxxxxx')

    const model =
      process.env.OPENROUTER_CHAT_MODEL || 'openrouter/auto'

    if (isPlaceholderKey) {
      const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
      
      let fallbackResponse = 'Здравствуйте! Чем могу помочь?'
      
      if (lastMessage.includes('цен') || lastMessage.includes('стоим') || lastMessage.includes('сколько')) {
        fallbackResponse = 'Стоимость всегда считается индивидуально. Ориентиры «от»: аудит — от 30 000 ₽, проектирование СПС — от 5 000 ₽, расчёт рисков — от 40 000 ₽, огнезащита — от 250 ₽/м², ПТМ — от 1 500 ₽/чел. Точную сумму назовёт менеджер после уточнения объекта. Можете нажать «Передать менеджеру» внизу чата или позвонить: +7 (495) 532-01-77'
      } else if (lastMessage.includes('аудит')) {
        fallbackResponse = 'Пожарный аудит: проверка документации и объекта, отчёт с рекомендациями. Ориентир — от 30 000 ₽, итог зависит от площади и сложности. Хотите передать контакты менеджеру через кнопку внизу чата?'
      } else if (lastMessage.includes('обуч') || lastMessage.includes('птм')) {
        fallbackResponse = 'Обучение и ПТМ — лицензированные программы, удостоверения. Ориентир от 1 500 ₽ за человека, точная сумма после согласования численности и формата.'
      } else if (lastMessage.includes('проект')) {
        fallbackResponse = 'Проектирование и монтаж СПС/АПС/СОУЭ — полный цикл. Ориентир от 5 000 ₽ за проектные работы (итог зависит от объекта). Подробности на /uslugi/proektirovanie-montazh-sps — могу подсказать следующий шаг.'
      } else if (lastMessage.includes('огнезащит')) {
        fallbackResponse = 'Огнезащита конструкций — от 250 ₽/м², состав и объём влияют на смету. Для расчёта удобно оставить заявку через «Передать менеджеру» в чате.'
      } else if (lastMessage.includes('контакт') || lastMessage.includes('телефон') || lastMessage.includes('адрес')) {
        fallbackResponse = 'Телефоны: +7 (495) 532-01-77, +7 (929) 911-03-46. Email: institut-npb@mail.ru. Адрес: 109052, г. Москва, проезд Автомобильный, дом 10, стр. 15, пом. 1/1. Пн–пт 10:00–18:00.'
      } else if (lastMessage.includes('заявк') || lastMessage.includes('консультац') || lastMessage.includes('связ')) {
        fallbackResponse = 'Оставить заявку: кнопка «Передать менеджеру» под перепиской в чате (переписка приложится), страница /kontakty или звонок +7 (495) 532-01-77.'
      }

      return NextResponse.json({ content: fallbackResponse })
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10),
        ],
        temperature: 0.65,
        max_tokens: 700,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error:', errorText)
      throw new Error('OpenRouter API error')
    }

    const data = await response.json()
    let content = data.choices?.[0]?.message?.content || 'Извините, не удалось получить ответ. Позвоните нам: +7 (495) 532-01-77'
    content = keepRussianOnly(content)

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { content: 'Извините, произошла ошибка. Пожалуйста, позвоните нам по телефону +7 (495) 532-01-77 или оставьте заявку на странице контактов.' },
      { status: 200 }
    )
  }
}
