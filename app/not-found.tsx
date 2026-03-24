import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-8xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold md:text-3xl">
          Страница не найдена
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Возможно, она была удалена или вы перешли по неверной ссылке.
          Вернитесь на главную или выберите нужный раздел.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              На главную
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/uslugi">
              Услуги
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/kontakty">
              Контакты
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
