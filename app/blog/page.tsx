import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { formatDateRu } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Блог",
  description: "Полезные статьи о пожарной безопасности. Новости законодательства, практические советы, обзоры оборудования от экспертов Института НПБ."
}

export default function BlogPage() {
  // Sort posts by date
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <>
      <Header />
      <main>
        {/* Hero — фон + затемнение 65%, светлый текст */}
        <section className="relative overflow-hidden bg-foreground py-16 text-background">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
            style={{ backgroundImage: "url(/images/blog-hero.png)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/65"
            aria-hidden
          />
          <div className="container relative z-10 mx-auto px-4">
            <nav className="mb-4 text-sm text-background/60">
              <Link href="/" className="hover:text-background">Главная</Link>
              <span className="mx-2">/</span>
              <span>Блог</span>
            </nav>
            <h1 className="text-4xl font-bold md:text-5xl">
              Блог
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-background/80">
              Полезные материалы о пожарной безопасности для руководителей и специалистов
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 mt-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDateRu(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Есть вопросы по пожарной безопасности?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Наши эксперты готовы ответить на ваши вопросы и помочь с любой задачей
            </p>
            <Link 
              href="/kontakty" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Задать вопрос
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      
    </>
  )
}
