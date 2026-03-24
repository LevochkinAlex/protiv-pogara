import { NextResponse } from 'next/server'
import { sendFeedbackEmail } from '@/lib/email'
import { sendTelegramNotification } from '@/lib/telegram-notify'

interface ChatLeadBody {
  name: string
  email: string
  phone?: string
  company?: string
  transcript: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatLeadBody
    const name = body.name?.trim() ?? ''
    const email = body.email?.trim() ?? ''
    const phone = body.phone?.trim()
    const company = body.company?.trim()
    const transcript = body.transcript?.trim() ?? ''

    if (name.length < 2) {
      return NextResponse.json({ error: 'Укажите имя' }, { status: 400 })
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Укажите корректный email' }, { status: 400 })
    }

    if (transcript.length < 10) {
      return NextResponse.json(
        { error: 'Недостаточно текста переписки' },
        { status: 400 },
      )
    }

    const message = [
      '--- Заявка из онлайн-чата ---',
      '',
      transcript,
    ].join('\n')

    const payload = {
      name,
      email,
      phone,
      company,
      message,
      source: 'chat-widget',
    }

    const [telegramResult, emailResult] = await Promise.all([
      sendTelegramNotification(payload),
      sendFeedbackEmail(payload),
    ])

    console.log('Chat lead:', {
      name,
      email,
      telegramSent: telegramResult.sent,
      emailSent: emailResult.sent,
    })

    return NextResponse.json({
      success: true,
      message: 'Менеджер получит вашу переписку и свяжется с вами.',
    })
  } catch (error) {
    console.error('Chat lead error:', error)
    return NextResponse.json(
      { error: 'Не удалось отправить. Позвоните: +7 (495) 532-01-77' },
      { status: 500 },
    )
  }
}
