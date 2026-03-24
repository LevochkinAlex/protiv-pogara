import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}
import { ServicesSection } from "@/components/sections/services-section"
import { AdvantagesSection } from "@/components/sections/advantages-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { BlogPreviewSection } from "@/components/sections/blog-preview-section"
import { CTASection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AdvantagesSection />
        <PricingSection />
        <BlogPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
