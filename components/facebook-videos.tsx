"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, ExternalLink } from "lucide-react"

export function FacebookVideos() {
  const [facebookPage, setFacebookPage] = useState("NamasteRadioToronto")
  const [tiktokUser, setTiktokUser] = useState("anilt72")
  const [tiktokVideoId, setTiktokVideoId] = useState("7532371121463774469")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fb = localStorage.getItem("facebookPage")
    const ttUser = localStorage.getItem("tiktokUser")
    const ttVid = localStorage.getItem("tiktokVideoId")
    if (fb) setFacebookPage(fb)
    if (ttUser) setTiktokUser(ttUser)
    if (ttVid) setTiktokVideoId(ttVid)
  }, [])

  const handleSave = () => {
    localStorage.setItem("facebookPage", facebookPage)
    localStorage.setItem("tiktokUser", tiktokUser)
    localStorage.setItem("tiktokVideoId", tiktokVideoId)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="space-y-4">
          <h4 className="font-semibold mb-2">Configure Social Media Clips</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Enter your Facebook page and TikTok video info
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium">Facebook Page Username</label>
            <Input
              placeholder="NamasteRadioToronto"
              value={facebookPage}
              onChange={(e) => setFacebookPage(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">TikTok Username</label>
            <Input
              placeholder="anilt72"
              value={tiktokUser}
              onChange={(e) => setTiktokUser(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">TikTok Video ID</label>
            <Input
              placeholder="7532371121463774469"
              value={tiktokVideoId}
              onChange={(e) => setTiktokVideoId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Example: the ID part from the TikTok URL 
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

  const fbPluginUrl = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${encodeURIComponent(
    facebookPage,
  )}&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId`

  const tiktokEmbedUrl = `https://www.tiktok.com/embed/v2/${tiktokVideoId}`

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <a href={`https://www.facebook.com/${facebookPage}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Facebook Page
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <a href={`https://www.tiktok.com/@${tiktokUser}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              TikTok Profile
            </a>
          </Button>
        </div>

        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
          Configure Clips
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="overflow-hidden bg-card/50 backdrop-blur border-border/50">
          <div className="w-full flex justify-center p-4">
            <iframe
              src={fbPluginUrl}
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

        <Card className="overflow-hidden bg-card/50 backdrop-blur border-border/50">
          <div className="w-full flex justify-center p-4">
            <iframe
              src={tiktokEmbedUrl}
              width="400"
              height="700"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
