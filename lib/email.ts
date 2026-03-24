import nodemailer from 'nodemailer'

export interface FeedbackEmailData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  source?: string
}

export async function sendFeedbackEmail(data: FeedbackEmailData): Promise<{ sent: boolean; error?: string }> {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.MAIL_FROM
  const to = process.env.MAIL_TO

  if (!host || !user || !pass || !from || !to) {
    console.log('SMTP credentials not configured - письмо не отправлено:', data)
    return { sent: false, error: 'no_credentials' }
  }

  const transporter = nodemailer.createTransport({
    host,
    port: port ? parseInt(port, 10) : 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  })

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
  <h2>Новая заявка с сайта inpb.pro</h2>
  <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
  ${data.phone ? `<p><strong>Телефон:</strong> ${escapeHtml(data.phone)}</p>` : ''}
  ${data.company ? `<p><strong>Организация:</strong> ${escapeHtml(data.company)}</p>` : ''}
  ${data.source ? `<p><strong>Источник:</strong> ${escapeHtml(data.source)}</p>` : ''}
  <p><strong>Сообщение:</strong></p>
  <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
  <hr>
  <p style="font-size: 12px; color: #666;">Сайт: inpb.pro · ${new Date().toLocaleString('ru-RU')}</p>
</body>
</html>
  `.trim()

  const text = [
    `Новая заявка с сайта inpb.pro`,
    ``,
    `Имя: ${data.name}`,
    `Email: ${data.email}`,
    ...(data.phone ? [`Телефон: ${data.phone}`] : []),
    ...(data.company ? [`Организация: ${data.company}`] : []),
    ...(data.source ? [`Источник: ${data.source}`] : []),
    ``,
    `Сообщение:`,
    data.message,
    ``,
    `--- ${new Date().toLocaleString('ru-RU')}`,
  ].join('\n')

  try {
    await transporter.sendMail({
      from: `"inpb.pro" <${from}>`,
      to,
      subject: `[inpb.pro] Новая заявка: ${data.name}`,
      text,
      html,
    })
    return { sent: true }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('SMTP send error:', errMsg)
    return { sent: false, error: errMsg }
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
