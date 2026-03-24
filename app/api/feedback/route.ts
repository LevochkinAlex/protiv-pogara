import { NextRequest, NextResponse } from 'next/server'
import { sendFeedbackEmail } from '@/lib/email'
import { sendTelegramNotification } from '@/lib/telegram-notify'

interface FeedbackData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  source?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackData = await request.json()

    // Валидация
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Укажите ваше имя' },
        { status: 400 }
      )
    }

    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Укажите корректный email' },
        { status: 400 }
      )
    }

    if (!body.message || body.message.trim().length < 5) {
      return NextResponse.json(
        { error: 'Напишите сообщение (минимум 5 символов)' },
        { status: 400 }
      )
    }

    const feedbackData = {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim(),
      company: body.company?.trim(),
      message: body.message.trim(),
      source: body.source?.trim(),
    }

    const telegramResult = await sendTelegramNotification(feedbackData)
    const emailResult = await sendFeedbackEmail(feedbackData)

    console.log('New feedback received:', {
      name: feedbackData.name,
      email: feedbackData.email,
      phone: feedbackData.phone,
      company: feedbackData.company,
      message: feedbackData.message.substring(0, 100),
      source: feedbackData.source,
      telegramSent: telegramResult.sent,
      emailSent: emailResult.sent,
    })

    return NextResponse.json({ 
      success: true,
      message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
    })
  } catch (error) {
    console.error('Feedback error:', error)
    return NextResponse.json(
      { error: 'Ошибка при отправке заявки. Попробуйте позже или позвоните нам.' },
      { status: 500 }
    )
  }
}
