'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ChatbotWidget = dynamic(
  () =>
    import('@/components/chat/chatbot-widget').then((m) => ({ default: m.ChatbotWidget })),
  { ssr: false, loading: () => null }
)

const Analytics = dynamic(
  () =>
    import('@vercel/analytics/next').then((m) => ({ default: m.Analytics })),
  { ssr: false, loading: () => null }
)

/**
 * После LCP: чанки чата и Vercel Analytics не конкурируют с первым отрисованным кадром (важно на мобильных / 3G).
 */
export function DeferredClientWidgets() {
  const [mountExtras, setMountExtras] = useState(false)

  useEffect(() => {
    const run = () => setMountExtras(true)
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }
    const t = window.setTimeout(run, 800)
    return () => window.clearTimeout(t)
  }, [])

  if (!mountExtras) return null

  return (
    <>
      <ChatbotWidget />
      <Analytics />
    </>
  )
}
