import { NextRequest, NextResponse } from 'next/server'
import { sendFeedbackEmail } from '@/lib/email'

interface FeedbackData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  source?: string
}

async function sendTelegramNotification(data: FeedbackData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.log('Telegram credentials not configured - заявка:', data)
    return { sent: false, reason: 'no_credentials' }
  }

  const message = `
📝 <b>Новая заявка с сайта</b>

👤 <b>Имя:</b> ${escapeHtml(data.name)}
📧 <b>Email:</b> ${escapeHtml(data.email)}
${data.phone ? `📱 <b>Телефон:</b> ${escapeHtml(data.phone)}\n` : ''}${data.company ? `🏢 <b>Организация:</b> ${escapeHtml(data.company)}\n` : ''}
💬 <b>Сообщение:</b>
${escapeHtml(data.message)}
  `.trim()

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Telegram API error:', errorData)
      return { sent: false, reason: 'api_error' }
    }

    return { sent: true }
  } catch (error) {
    console.error('Telegram send error:', error)
    return { sent: false, reason: 'network_error' }
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
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

    // Отправляем уведомление в Telegram
    const telegramResult = await sendTelegramNotification(feedbackData)

    // Отправляем на email через SMTP
    const emailResult = await sendFeedbackEmail(feedbackData)

    // Логируем заявку (для отладки)
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
