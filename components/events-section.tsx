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
            <span className="gradient-text">News Sections</span>
          </h2>
          <h2 className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comming Soon
          </h2>
        </div>

   
      </div>
    </section>
  )
}
