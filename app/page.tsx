"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { VideosSection } from "@/components/programs-section"
import { SocialMediaSection } from "@/components/social-media-section"
import { EventsSection } from "@/components/events-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import NewsAndAudio from "@/components/NewsAndAudio";
import NewsSection from "@/components/NewsSection";
import RecordingSection from "@/components/RecordingSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <RecordingSection />

    <VideosSection /> 
      <SocialMediaSection /> 
      <NewsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
