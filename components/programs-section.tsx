import { FacebookVideos } from "@/components/facebook-videos"

export async function VideosSection() {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-balance">Community Videos</h2>
            <p className="text-muted-foreground max-w-2xl text-pretty">Watch our latest videos from Facebook</p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-primary">Latest from Facebook</span>
          </h3>
          <FacebookVideos /> 
        </div>
      </div>
    </section>
  )
}
