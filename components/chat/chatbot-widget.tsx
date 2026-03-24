'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { X, MessageCircle, Send, Bot, User, FileText, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Добрый день! Я помощник Института НПБ. Как я могу вам помочь?\n\nВы можете спросить меня о:\n- Пожарном аудите\n- Проектировании систем пожаротушения\n- Огнезащитной обработке\n- Обучении ПТМ\n- Ценах на услуги\n\nЕсли захотите, чтобы менеджер перезвонил с учётом переписки — нажмите «Передать менеджеру» ниже и оставьте контакты.',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [leadOpen, setLeadOpen] = useState(false)
  const [leadName, setLeadName] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [leadCompany, setLeadCompany] = useState('')
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadError, setLeadError] = useState('')
  const [leadSuccess, setLeadSuccess] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const transcript = useMemo(
    () =>
      messages
        .map((m) => `${m.role === 'user' ? 'Клиент' : 'Консультант'}: ${m.content}`)
        .join('\n\n'),
    [messages],
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка сети')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content || 'Извините, произошла ошибка. Попробуйте позже.',
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Извините, не удалось получить ответ. Пожалуйста, позвоните нам по телефону +7 (495) 532-01-77 или оставьте заявку на странице контактов.',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLeadError('')
    setLeadSuccess(false)
    setLeadSubmitting(true)
    try {
      const res = await fetch('/api/chat/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          phone: leadPhone || undefined,
          company: leadCompany || undefined,
          transcript,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Ошибка отправки')
      }
      setLeadSuccess(true)
      setLeadName('')
      setLeadEmail('')
      setLeadPhone('')
      setLeadCompany('')
      setLeadOpen(false)
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : 'Ошибка отправки')
    } finally {
      setLeadSubmitting(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-card rounded-2xl shadow-2xl border border-border w-[360px] md:w-[400px] max-h-[min(90vh,620px)] h-[min(90vh,620px)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Консультант</h3>
                <p className="text-xs opacity-80">Институт НПБ</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-card border border-border text-card-foreground rounded-tl-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Bot className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border bg-muted/20 shrink-0">
            <button
              type="button"
              onClick={() => {
                setLeadOpen((o) => !o)
                setLeadSuccess(false)
              }}
              className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-primary hover:bg-muted/40"
            >
              <FileText className="h-4 w-4 shrink-0" />
              Передать менеджеру
              {leadOpen ? (
                <ChevronUp className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0" />
              )}
            </button>
            {leadOpen && (
              <form
                onSubmit={handleLeadSubmit}
                className="space-y-3 border-t border-border px-4 py-3 text-left"
              >
                <p className="text-xs text-muted-foreground">
                  К письму приложится эта переписка. Письмо уходит на почту менеджера (как и заявки с сайта).
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="chat-lead-name" className="text-xs">
                    Имя *
                  </Label>
                  <Input
                    id="chat-lead-name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    required
                    minLength={2}
                    placeholder="Как к вам обращаться"
                    className="h-9 text-sm"
                    disabled={leadSubmitting}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="chat-lead-email" className="text-xs">
                    Email *
                  </Label>
                  <Input
                    id="chat-lead-email"
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    required
                    placeholder="Для ответа менеджера"
                    className="h-9 text-sm"
                    disabled={leadSubmitting}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="chat-lead-phone" className="text-xs">
                    Телефон
                  </Label>
                  <Input
                    id="chat-lead-phone"
                    type="tel"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+7 …"
                    className="h-9 text-sm"
                    disabled={leadSubmitting}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="chat-lead-company" className="text-xs">
                    Организация / объект
                  </Label>
                  <Input
                    id="chat-lead-company"
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    placeholder="По желанию"
                    className="h-9 text-sm"
                    disabled={leadSubmitting}
                  />
                </div>
                {leadError && (
                  <p className="text-xs text-destructive">{leadError}</p>
                )}
                <Button
                  type="submit"
                  size="sm"
                  className="w-full"
                  disabled={leadSubmitting || transcript.length < 10}
                >
                  {leadSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправляем…
                    </>
                  ) : (
                    'Отправить менеджеру'
                  )}
                </Button>
              </form>
            )}
            <Link
              href="/kontakty?source=chat"
              className="flex items-center justify-center gap-2 border-t border-border py-2 text-xs text-muted-foreground hover:text-primary hover:underline"
            >
              Полная форма на странице контактов
            </Link>
          </div>
          {leadSuccess && (
            <div className="border-t border-border bg-green-50 px-4 py-2 text-center text-xs text-green-800 dark:bg-green-950 dark:text-green-200">
              Заявка отправлена. Менеджер свяжется с вами.
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-border p-4 flex gap-2 bg-card"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишите сообщение..."
              disabled={isLoading}
              className="flex-1 rounded-full"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
              className="rounded-full"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-sm font-medium pr-1">Онлайн-консультант</span>
        </button>
      )}
    </div>
  )
}
