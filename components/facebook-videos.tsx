"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, ExternalLink } from "lucide-react"

const DEFAULT_VIDEOS = [
  {
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=false&width=560&t=0",
    title: "Sample Video 1",
  },
  {
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=false&width=560&t=0",
    title: "Sample Video 2",
  },
  {
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=false&width=560&t=0",
    title: "Sample Video 3",
  },
  {
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=false&width=560&t=0",
    title: "Sample Video 4",
  },
]

export function FacebookVideos() {
  const [facebookPageUrl, setFacebookPageUrl] = useState("nepaliradiotoronto")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Load saved Facebook page URL from localStorage
    const savedUrl = localStorage.getItem("facebookPageUrl")
    if (savedUrl) {
      setFacebookPageUrl(savedUrl)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("facebookPageUrl", facebookPageUrl)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Configure Facebook Page</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your Facebook page username or ID to display all your videos
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Facebook Page Username/ID</label>
            <Input
              placeholder="nepaliradiotoronto"
              value={facebookPageUrl}
              onChange={(e) => setFacebookPageUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Example: If your page is facebook.com/nepaliradiotoronto, enter "nepaliradiotoronto"
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Configuration
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  const pagePluginUrl = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${encodeURIComponent(
    facebookPageUrl,
  )}&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId`

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <a href={`https://www.facebook.com/${facebookPageUrl}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Visit Facebook Page
          </a>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
          Configure Videos
        </Button>
      </div>

      <Card className="overflow-hidden bg-card/50 backdrop-blur border-border/50">
        <div className="w-full flex justify-center p-4">
          <iframe
            src={pagePluginUrl}
            width="500"
            height="700"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="yes"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      </Card>
    </div>
  )
}
