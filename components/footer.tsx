import { Radio, Facebook, Youtube, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Radio className="h-8 w-8 text-primary" />
              <div className="text-xl font-bold">
                <span className="gradient-text">Nepali Radio</span>
                <span className="text-muted-foreground text-sm block leading-none">Toronto</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md text-pretty">
              Connecting the Nepali community in Toronto through music, culture, and shared stories. Broadcasting 24/7
              to keep our heritage alive.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-primary transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-primary transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-primary transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>(647) 282 7635</li>
              <li>namasteradio2005@gmail.com</li>
              <li>5832 wachtsmatch crossing missisaga</li>
              <li>Toronto, L5M-6N9</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; 2025 Nepali Radio Toronto. All rights reserved. | Broadcasting with love from Toronto to the world.
          </p>
        </div>
      </div>
    </footer>
  )
}
