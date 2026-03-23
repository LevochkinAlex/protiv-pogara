"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { services } from "@/lib/services-data"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/layout/logo-mark"

const navigation = [
  { name: "Главная", href: "/" },
  { name: "О нас", href: "/about" },
  { name: "Услуги", href: "/uslugi", hasSubmenu: true },
  { name: "Блог", href: "/blog" },
  { name: "Контакты", href: "/kontakty" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToTopIfCurrent = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => scrollToTopIfCurrent("/")}>
            <LogoMark priority />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-tight text-foreground">Институт НПБ</p>
              <p className="text-xs text-muted-foreground">Противопожарная безопасность</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {/* viewport={false}: без общего viewport Radix — иначе часто «белый прямоугольник» без текста из‑за анимаций/наследования */}
          <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.hasSubmenu ? (
                    <>
                      <NavigationMenuTrigger className="text-sm">{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent className="left-0 top-0 w-full min-w-[min(100vw-2rem,600px)] rounded-md border border-border bg-popover p-0 text-popover-foreground shadow-md md:absolute md:w-auto">
                        <ul className="grid w-[min(100vw-2rem,600px)] gap-1 p-2 sm:grid-cols-2">
                          {services.slice(0, 8).map((service) => (
                            <li key={service.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/uslugi/${service.slug}`}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                    "text-popover-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground",
                                    "hover:[&_.subline]:text-foreground/80"
                                  )}
                                  onClick={() => scrollToTopIfCurrent(`/uslugi/${service.slug}`)}
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {service.shortTitle}
                                  </div>
                                  <p className="subline line-clamp-2 text-xs leading-snug text-muted-foreground">
                                    {service.price}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                          <li className="col-span-full sm:col-span-2">
                            <NavigationMenuLink asChild>
                              <Link
                                href="/uslugi"
                                className="flex h-full w-full select-none items-center justify-center rounded-md bg-primary/10 p-3 text-sm font-medium text-primary no-underline outline-none hover:bg-primary/20"
                                onClick={() => scrollToTopIfCurrent("/uslugi")}
                              >
                                Все услуги
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => scrollToTopIfCurrent(item.href)}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Contact Info & CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <a href="tel:+74955320177" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <Phone className="h-4 w-4" />
              <span>+7 (495) 532-01-77</span>
            </a>
            <Button asChild>
              <Link href="/kontakty" onClick={() => scrollToTopIfCurrent("/kontakty")}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Консультация
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="sr-only p-0">
                <SheetTitle>Меню</SheetTitle>
                <SheetDescription>Навигация и контакты</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 mb-6"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    scrollToTopIfCurrent("/")
                  }}
                >
                  <LogoMark />
                  <div>
                    <p className="text-sm font-semibold">Институт НПБ</p>
                    <p className="text-xs text-muted-foreground">Противопожарная безопасность</p>
                  </div>
                </Link>
                
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      scrollToTopIfCurrent(item.href)
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="mt-6 border-t border-border pt-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Phone className="text-primary h-5 w-5 shrink-0" />
                    <div className="flex flex-col gap-1">
                      <a
                        href="tel:+74955320177"
                        className="text-muted-foreground hover:text-primary text-sm"
                      >
                        +7 (495) 532-01-77
                      </a>
                      <a
                        href="tel:+79299110346"
                        className="text-muted-foreground hover:text-primary text-sm"
                      >
                        +7 (929) 911-03-46
                      </a>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link
                      href="/kontakty"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        scrollToTopIfCurrent("/kontakty")
                      }}
                    >
                      Получить консультацию
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
