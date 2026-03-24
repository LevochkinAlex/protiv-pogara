'use client'

import { useEffect, useRef, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const COUNTER_ID = 108217653

/** Отправка просмотра при клиентских переходах Next.js (init даёт первый hit сам). */
function YandexMetrikaHitsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirst = useRef(true)

  useEffect(() => {
    const search = searchParams.toString()
    const url = search ? `${pathname}?${search}` : pathname

    if (isFirst.current) {
      isFirst.current = false
      return
    }

    const send = () => {
      if (typeof window === 'undefined') return
      const ym = window.ym as ((id: number, cmd: string, ...args: unknown[]) => void) | undefined
      if (typeof ym === 'function') {
        ym(COUNTER_ID, 'hit', url)
      }
    }

    send()
    const t = window.setTimeout(send, 100)
    return () => window.clearTimeout(t)
  }, [pathname, searchParams])

  return null
}

export function YandexMetrikaHits() {
  return (
    <Suspense fallback={null}>
      <YandexMetrikaHitsInner />
    </Suspense>
  )
}
