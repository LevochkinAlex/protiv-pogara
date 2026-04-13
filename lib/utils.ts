import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Сегодняшняя дата в формате YYYY-MM-DD (локальный календарь). */
export function todayIsoDate(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Для сортировки и отображения: дата публикации не позже сегодняшнего календарного дня. */
export function effectivePublishedIso(iso: string): string {
  const published = new Date(iso + 'T12:00:00')
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0)
  return published > today ? todayIsoDate() : iso
}

/**
 * Даты публикаций блога (ISO `YYYY-MM-DD`).
 * Если дата в данных позже сегодняшнего дня — показываем сегодня (защита от ошибок при вводе).
 */
export function formatBlogPublishedDate(iso: string, style: 'short' | 'long' = 'short'): string {
  return formatDateRu(effectivePublishedIso(iso), style)
}

/** Даты публикаций блога (ISO `YYYY-MM-DD`). */
export function formatDateRu(iso: string, style: 'short' | 'long' = 'short'): string {
  const d = new Date(iso + 'T12:00:00')
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
