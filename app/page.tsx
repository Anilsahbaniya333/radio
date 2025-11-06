"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { VideosSection } from "@/components/programs-section"
import { SocialMediaSection } from "@/components/social-media-section"
import { EventsSection } from "@/components/events-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
    <VideosSection /> 
      <SocialMediaSection /> 
      <EventsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
