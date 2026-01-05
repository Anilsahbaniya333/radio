"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Radio, Play, Pause } from "lucide-react"

// ✅ Use a direct stream URL (NOT the Streema webpage URL)
// If your stream doesn’t play, replace this with the correct direct audio stream link.
const STREAM_URL = "https://live.cmr24.net/CMR/CMR-MQ/icecast.audio"

// ✅ Put your logo in: /public/namaste-radio-logo.png
const LOGO_SRC = "/namaste-radio-logo.png.jpeg"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current.load()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlay = async () => {
    try {
      // Create audio only on click (browser autoplay rules)
      if (!audioRef.current) {
        const audio = new Audio(STREAM_URL)
        audio.preload = "none"
        audioRef.current = audio

        audio.addEventListener("playing", () => {
          setIsLoading(false)
          setIsPlaying(true)
        })
        audio.addEventListener("pause", () => {
          setIsLoading(false)
          setIsPlaying(false)
        })
        audio.addEventListener("ended", () => {
          setIsLoading(false)
          setIsPlaying(false)
        })
        audio.addEventListener("waiting", () => setIsLoading(true))
        audio.addEventListener("stalled", () => setIsLoading(true))
        audio.addEventListener("error", () => {
          setIsLoading(false)
          setIsPlaying(false)
          console.error("Stream error: could not load audio.")
        })
      }

      const audio = audioRef.current
      if (!audio) return

      if (isPlaying) {
        audio.pause()
        return
      }

      setIsLoading(true)
      await audio.play()
    } catch (e) {
      setIsLoading(false)
      setIsPlaying(false)
      console.error("Failed to play stream:", e)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2">
            <Radio className="h-8 w-8 text-primary" />
            <div className="text-xl font-bold">
              <span className="gradient-text">Nepali Radio</span>
              <span className="text-muted-foreground text-sm block leading-none">Toronto</span>
            </div>
          </div>

          {/* Desktop Navigation (logo inserted between brand and Home) */}
          <div className="hidden md:flex items-center space-x-18">
            {/* ✅ Your logo between Brand and Home */}
            <img
              src={LOGO_SRC}
              alt="Namaste Radio Logo"
              className="h-15 w-15 object-contain rounded-full border border-border bg-white/70 p-1"
            />

            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#programs" className="text-foreground hover:text-primary transition-colors">
              Programs
            </a>
            <a href="#community" className="text-foreground hover:text-primary transition-colors">
              Community
            </a>
            <a href="#events" className="text-foreground hover:text-primary transition-colors">
              Events
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Live Player & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={togglePlay}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isLoading ? "Connecting..." : isPlaying ? "Pause" : "Live"}
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex items-center gap-3 pb-4">
              <img
                src={LOGO_SRC}
                alt="Namaste Radio Logo"
                className="h-10 w-10 object-contain rounded-full border border-border bg-white/70 p-1"
              />
              <div className="leading-tight">
                <div className="font-semibold">Namaste Radio</div>
                <div className="text-xs text-muted-foreground">Voice of the Nepalese Community</div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
              <a href="#programs" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Programs
              </a>
              <a href="#community" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Community
              </a>
              <a href="#events" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Events
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
