import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

const events = [
  {
    title: "Tihar Festival Celebration",
    date: "November 15, 2024",
    time: "6:00 PM - 11:00 PM",
    location: "Toronto Convention Centre",
    description:
      "Join us for the festival of lights with traditional music, dance performances, and authentic Nepali cuisine.",
    attendees: "500+ expected",
    status: "Upcoming",
    image: "/tihar-festival-celebration-with-colorful-lights-an.jpg",
  },
  {
    title: "Nepali New Year 2081",
    date: "April 14, 2024",
    time: "12:00 PM - 8:00 PM",
    location: "Harbourfront Centre",
    description: "Celebrate the Nepali New Year with cultural programs, traditional food, and community gathering.",
    attendees: "800+ attended",
    status: "Past",
    image: "/nepali-new-year-celebration-with-traditional-music.jpg",
  },
  {
    title: "Community Health Fair",
    date: "December 8, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Scarborough Civic Centre",
    description:
      "Free health screenings, wellness workshops, and health information sessions for the Nepali community.",
    attendees: "300+ expected",
    status: "Upcoming",
    image: "/placeholder-9rua2.jpg",
  },
]

export function EventsSection() {
  return (
    <section id="events" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Community Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Bringing the Nepali community together through cultural celebrations and meaningful gatherings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card
              key={index}
              className="bg-background border-border hover:border-primary/50 transition-colors overflow-hidden"
            >
              <div className="relative">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={event.status === "Upcoming" ? "default" : "secondary"}
                    className={event.status === "Upcoming" ? "bg-primary text-primary-foreground" : ""}
                  >
                    {event.status}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription className="text-base">{event.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{event.attendees}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant={event.status === "Upcoming" ? "default" : "outline"}
                  disabled={event.status === "Past"}
                >
                  {event.status === "Upcoming" ? "Register Now" : "View Photos"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
