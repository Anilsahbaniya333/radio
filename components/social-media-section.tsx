"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play, Heart, MessageCircle, ArrowRight } from "lucide-react"

// Add a 'link' property to each social post object
const socialPosts = [
  {
    platform: "Facebook",
    type: "Live Event",
    title: "Dashain Festival Celebration 2024",
    description:
      "Join us for the biggest Nepali festival celebration in Toronto! Traditional music, dance, and delicious food.",
    engagement: "234 likes • 45 comments",
    time: "2 hours ago",
    image: "/dashain-festival-celebration-with-traditional-nepa.jpg",
    color: "bg-blue-500",
    link: "https://facebook.com/your-page/dashain-post-link", // Added link
  },
  {
    platform: "YouTube",
    type: "Video",
    title: "Interview with Local Nepali Artist",
    description:
      "Exclusive interview with rising Nepali musician Sameer Shrestha about his journey in Toronto's music scene.",
    engagement: "1.2K views • 89 likes",
    time: "1 day ago",
    image: "/nepali-musician-with-traditional-instruments-in-re.jpg",
    color: "bg-red-500",
    link: "https://youtube.com/your-channel/video-link", // Added link
  },
  {
    platform: "TikTok",
    type: "Trending",
    title: "Nepali Cooking Tutorial",
    description: "Quick and easy Momo recipe that's taking TikTok by storm! Perfect for busy Toronto life.",
    engagement: "15.3K views • 892 likes",
    time: "3 days ago",
    image: "/traditional-nepali-momos-being-prepared-in-modern-.jpg",
    color: "bg-pink-500",
    link: "https://tiktok.com/@your-account/video-link", // Added link
  },
  {
    platform: "Facebook",
    type: "Community Post",
    title: "Community Job Fair Success",
    description: "Thank you to everyone who attended our community job fair! Over 50 local businesses participated.",
    engagement: "156 likes • 23 shares",
    time: "1 week ago",
    image: "/community-job-fair-with-nepali-professionals-netwo.jpg",
    color: "bg-blue-500",
    link: "https://facebook.com/your-page/job-fair-post-link", // Added link
  },
]

export function SocialMediaSection() {
  return (
    <section id="community" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Community Buzz</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Catch up on our latest posts and events right here. Your community is always active!
          </p>
        </div>

        <div className="grid grid-cols-1 md:-cols-2 lg:grid-cols-4 gap-6"> {/* Increased grid to 4 columns on large screens */}
          {socialPosts.map((post, index) => (
            <a
              key={index}
              href={post.link} // Use the link property here
              target="_blank" // Open link in new tab
              rel="noopener noreferrer"
              className="group block" // Make the whole component a block link
            >
              <Card
                className="h-full flex flex-col bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" // Slower transition for a smoother effect
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${post.color} text-white border-0 hover:opacity-90`}>{post.platform}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">{post.type}</Badge>
                  </div>
                  {post.platform === "YouTube" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3 group-hover:bg-primary/80 transition-colors">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <CardHeader className="flex-grow"> {/* Allows header to grow and push content down */}
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="mt-auto"> {/* Ensures content is pushed to the bottom */}
                  <p className="text-muted-foreground mb-4 text-sm text-pretty line-clamp-3">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1" title="Likes/Views">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span>{post.engagement.split("•")[0].trim()}</span>
                      </span>
                      {post.engagement.includes("comments") && (
                        <span className="flex items-center space-x-1" title="Comments/Shares">
                          <MessageCircle className="h-3 w-3" />
                          <span>{post.engagement.split("•")[1].trim()}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                      {/* Removed the extra button since the whole card is now the link */}
                      <ExternalLink className="h-4 w-4 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="default" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            View All Posts on Facebook
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}