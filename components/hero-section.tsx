
"use client"
import { Button } from "@/components/ui/button"
import { Play, Calendar, Headphones, Users, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Image Content - Left Side */}
          <div className="relative lg:-ml-8">
            <div className="relative rounded-r-3xl lg:rounded-r-[4rem] overflow-hidden shadow-2xl">
              <img
                src="/anil-3.jpg"
                alt="Nepali community celebration"
                className="w-full h-[400px] lg:h-[600px] object-cover object-center"
                style={{ 
                  objectPosition: "center 30%",
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-transparent" />
            </div>
            
            {/* Decorative corner elements */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl z-0"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/5 rounded-full blur-xl z-0"></div>
          </div>

          {/* Text Content - Right Side */}
          <div className="space-y-8 lg:space-y-10 lg:pl-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Headphones className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Live Streaming 24/7</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Nepali Radio
                </span>
                <br />
                <span className="text-foreground">Toronto</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Nepal music, news, and community events. Connecting the Nepali diaspora in Toronto through culture and conversation.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base font-semibold"
              >
                <Play className="h-5 w-5 mr-2" />
                Listen Live Now
              </Button>

            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-md">
              <div className="text-center p-4 rounded-xl bg-muted/50 border border-border">
                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-xl font-bold text-foreground mb-1">24/7</div>
                <div className="text-muted-foreground text-xs font-medium">Live Broadcast</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50 border border-border">
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-xl font-bold text-foreground mb-1">10K+</div>
                <div className="text-muted-foreground text-xs font-medium">Active Listeners</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50 border border-border">
                <Headphones className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-xl font-bold text-foreground mb-1">15+</div>
                <div className="text-muted-foreground text-xs font-medium">Weekly Shows</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}