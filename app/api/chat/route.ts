import { NextResponse } from 'next/server'

const systemPrompt = `Вы - вежливый и профессиональный консультант Института Национальной Противопожарной Безопасности (Институт НПБ) в Москве.

О компании:
- Более 20 лет опыта в сфере пожарной безопасности
- Эксперты МЧС с государственными сертификатами
- Комплексные решения "под ключ"

Услуги и цены:
1. Пожарный аудит - от 30 000 руб. Независимая оценка рисков, выявление нарушений, рекомендации по устранению.
2. Проектирование и монтаж СПС, АУПТ, СОУЭ - от 50 000 руб. Полный цикл: проект, монтаж, сдача инспекции.
3. Расчёт пожарных рисков, СТУ, КИТОМ - от 40 000 руб. Разработка и согласование с МЧС.
4. Огнезащитная обработка конструкций - от 250 руб/м². Обработка металла, дерева, кабельных трасс.
5. Обучение ПТМ (пожарно-технический минимум) - от 1 500 руб/чел. Лицензированные программы, удостоверения.
6. Планы эвакуации - от 5 000 руб. По ГОСТ, фотолюминесцентные.
7. Пакет документов ПБ - от 15 000 руб. Полный комплект для проверки МЧС.
8. Лицензия МЧС и сопровождение проверок - от 50 000 руб.
9. Световые оповещатели и оборудование - от 500 руб.

Контакты:
- Телефон: +7 (495) 532-01-77, +7 (929) 911-03-46
- Email: institut-npb@mail.ru
- Адрес: Москва, Курсовой пер., 17 стр.1, офис 13

Ваша задача - помочь клиенту разобраться в услугах, ответить на вопросы и при интересе предложить оставить заявку на странице /kontakty или позвонить по телефону.

Правила общения:
- Отвечайте кратко и по делу (2-4 предложения)
- Будьте дружелюбны и профессиональны
- Если вопрос не по теме - вежливо верните к услугам компании
- Всегда предлагайте следующий шаг (консультация, расчёт, звонок)`

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json() as { messages: ChatMessage[] }

    const apiKey = process.env.OPENROUTER_API_KEY
    const isPlaceholderKey =
      !apiKey ||
      apiKey.includes('your-api-key') ||
      apiKey.includes('xxxxxxxx')

    // :free модели часто только у Venice; при отключённом Venice в настройках OpenRouter — 404.
    // openrouter/auto подбирает доступную дешёвую модель (часто Cloudflare и т.п.).
    const model =
      process.env.OPENROUTER_CHAT_MODEL || 'openrouter/auto'

    if (isPlaceholderKey) {
      // Fallback ответы без AI
      const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
      
      let fallbackResponse = 'Здравствуйте! Чем могу помочь?'
      
      if (lastMessage.includes('цен') || lastMessage.includes('стоим') || lastMessage.includes('сколько')) {
        fallbackResponse = 'Наши цены:\n\n- Пожарный аудит - от 30 000 руб.\n- Проектирование СПС - от 50 000 руб.\n- Огнезащита - от 250 руб/м²\n- Обучение ПТМ - от 1 500 руб/чел.\n\nДля точного расчёта оставьте заявку или позвоните: +7 (495) 532-01-77'
      } else if (lastMessage.includes('аудит')) {
        fallbackResponse = 'Пожарный аудит включает:\n- Проверку документации\n- Осмотр объекта\n- Оценку рисков\n- Рекомендации по устранению нарушений\n\nСтоимость от 30 000 руб. Хотите оставить заявку на расчёт?'
      } else if (lastMessage.includes('обуч') || lastMessage.includes('птм')) {
        fallbackResponse = 'Обучение ПТМ проводим по лицензированным программам. Выдаём удостоверения. Стоимость от 1 500 руб/чел. Возможно обучение на вашей территории.'
      } else if (lastMessage.includes('проект')) {
        fallbackResponse = 'Разрабатываем проекты систем пожарной сигнализации и автоматического пожаротушения согласно всем нормам. Стоимость от 50 000 руб. в зависимости от площади объекта.'
      } else if (lastMessage.includes('огнезащит')) {
        fallbackResponse = 'Выполняем огнезащитную обработку металлоконструкций, деревянных элементов, кабельных трасс. Используем сертифицированные составы. Стоимость от 250 руб/м².'
      } else if (lastMessage.includes('контакт') || lastMessage.includes('телефон') || lastMessage.includes('адрес')) {
        fallbackResponse = 'Наши контакты:\n\nТелефон: +7 (495) 532-01-77, +7 (929) 911-03-46\nEmail: institut-npb@mail.ru\nАдрес: Москва, Курсовой пер., 17 стр.1, офис 13\n\nРаботаем пн-пт с 10:00 до 18:00'
      } else if (lastMessage.includes('заявк') || lastMessage.includes('консультац') || lastMessage.includes('связ')) {
        fallbackResponse = 'Оставить заявку можно:\n1. На странице контактов: /kontakty\n2. По телефону: +7 (495) 532-01-77\n3. На email: institut-npb@mail.ru\n\nМы перезвоним в течение 15 минут!'
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
          ...messages.slice(-10), // Последние 10 сообщений для контекста
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error:', errorText)
      throw new Error('OpenRouter API error')
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || 'Извините, не удалось получить ответ. Позвоните нам: +7 (495) 532-01-77'

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { content: 'Извините, произошла ошибка. Пожалуйста, позвоните нам по телефону +7 (495) 532-01-77 или оставьте заявку на странице контактов.' },
      { status: 200 } // Возвращаем 200 чтобы клиент мог показать сообщение
    )
  }
}
