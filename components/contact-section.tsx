import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, Instagram } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Connect with us to share your stories, request songs, or get involved with our community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Phone</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">(647) 282 7635</p>
                <p className="text-muted-foreground">Call us during business hours</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">namasteradio2005@gmail.com</p>
                <p className="text-muted-foreground">We'll respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Studio Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">2184 Kipling Ave Toronto</p>
                <p className="text-lg">Toronto, ON M9W 4K9</p>
                <p className="text-muted-foreground">Visit us by appointment</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Business Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p>Sunday - Friday Only by oppointment</p>
                  <p>Saturday: 7 AM - 8:00 AM</p>
                 
                </div>
                <p className="text-muted-foreground mt-2">Broadcasting 24/7</p>
              </CardContent>
            </Card>

            {/* Social Media */}
            <div className="flex space-x-4">
              <Button
                size="icon"
                variant="outline"
                className="hover:bg-blue-500 hover:text-white hover:border-blue-500 bg-transparent"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="hover:bg-red-500 hover:text-white hover:border-red-500 bg-transparent"
              >
                <Youtube className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="hover:bg-pink-500 hover:text-white hover:border-pink-500 bg-transparent"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Have a story to share? Want to request a song? We'd love to hear from you!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name</label>
                  <Input placeholder="Your first name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name</label>
                  <Input placeholder="Your last name" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Phone (Optional)</label>
                <Input type="tel" placeholder="(416) 555-0123" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="What's this about?" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea placeholder="Tell us your story, request a song, or share your thoughts..." rows={5} />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
