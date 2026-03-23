import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react"
import { blogPosts, getBlogPostBySlug, getAllBlogSlugs, getRecentPosts } from "@/lib/blog-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    return { title: "Статья не найдена" }
  }
  
  return {
    title: post.metaTitle,
    description: post.metaDescription,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  // Get related posts (excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3)

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-foreground text-background py-16">
          <div className="container mx-auto px-4">
            <nav className="mb-4 text-sm text-background/60">
              <Link href="/" className="hover:text-background">Главная</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-background">Блог</Link>
              <span className="mx-2">/</span>
              <span className="truncate max-w-[200px] inline-block align-bottom">{post.title}</span>
            </nav>
            
            <Badge className="mb-4 bg-primary/20 text-primary-foreground">{post.category}</Badge>
            
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl text-balance max-w-4xl">
              {post.title}
            </h1>
            
            <div className="mt-6 flex flex-wrap items-center gap-6 text-background/70">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(post.publishedAt).toLocaleDateString('ru-RU', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime} чтения</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Article Content */}
              <article className="lg:col-span-2">
                <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
                  {/* Render markdown-like content */}
                  {post.content.split('\n').map((line, index) => {
                    if (line.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">{line.replace('## ', '')}</h2>
                    }
                    if (line.startsWith('### ')) {
                      return <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">{line.replace('### ', '')}</h3>
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={index} className="font-semibold text-foreground my-2">{line.replace(/\*\*/g, '')}</p>
                    }
                    if (line.startsWith('- ')) {
                      return <li key={index} className="ml-4 text-muted-foreground">{line.replace('- ', '')}</li>
                    }
                    if (line.startsWith('- [ ] ')) {
                      return <li key={index} className="ml-4 text-muted-foreground flex items-center gap-2">
                        <span className="w-4 h-4 border border-border rounded"></span>
                        {line.replace('- [ ] ', '')}
                      </li>
                    }
                    if (line.trim() === '') {
                      return <br key={index} />
                    }
                    if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
                      return <li key={index} className="ml-4 text-muted-foreground list-decimal">{line.replace(/^\d+\.\s/, '')}</li>
                    }
                    return <p key={index} className="text-muted-foreground my-3 leading-relaxed">{line}</p>
                  })}
                </div>

                {/* Back to blog */}
                <div className="mt-12 pt-8 border-t border-border">
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Вернуться к статьям
                  </Link>
                </div>
              </article>

              <aside className="space-y-6" aria-label="Дополнительно">
                {/* CTA Card */}
                <Card className="bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle>Нужна консультация?</CardTitle>
                    <p className="text-primary-foreground/80 text-sm">
                      Эксперты Института НПБ ответят на ваши вопросы
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Link 
                      href="/kontakty" 
                      className="inline-flex w-full items-center justify-center rounded-md bg-background text-foreground px-4 py-2 text-sm font-medium hover:bg-background/90 transition-colors"
                    >
                      Задать вопрос
                    </Link>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Другие статьи</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link 
                        key={related.id} 
                        href={`/blog/${related.slug}`}
                        className="block group"
                      >
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(related.publishedAt).toLocaleDateString('ru-RU')}
                        </p>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
    </>
  )
}
