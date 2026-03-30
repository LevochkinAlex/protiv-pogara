import type { FeedbackEmailData } from '@/lib/email'
import { escapeHtml } from '@/lib/utils'

export async function sendTelegramNotification(data: FeedbackEmailData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.log('Telegram credentials not configured - заявка:', data)
    return { sent: false, reason: 'no_credentials' as const }
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
      return { sent: false, reason: 'api_error' as const }
    }

    return { sent: true as const }
  } catch (error) {
    console.error('Telegram send error:', error)
    return { sent: false, reason: 'network_error' as const }
  }
}
