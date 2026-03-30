import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Даты публикаций блога (ISO `YYYY-MM-DD`). */
export function formatDateRu(iso: string, style: 'short' | 'long' = 'short'): string {
  const d = new Date(iso)
  if (style === 'long') {
    return d.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  return d.toLocaleDateString('ru-RU')
}

/** Экранирование для HTML и Telegram (HTML parse_mode). */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
