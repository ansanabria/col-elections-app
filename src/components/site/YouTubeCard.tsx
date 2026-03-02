/**
 * Extracts the YouTube video ID from common URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) return match[1]
  }

  return null
}

type YouTubeCardProps = {
  title: string
  youtubeUrl: string
  description?: string | null
  publishedDate?: string | null
  channel?: string | null
}

export function YouTubeCard({
  title,
  youtubeUrl,
  description,
  publishedDate,
  channel,
}: YouTubeCardProps) {
  const videoId = extractYouTubeId(youtubeUrl)

  if (!videoId) return null

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors duration-150 hover:border-primary/30">
      <div className="relative aspect-video w-full bg-secondary">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground">{title}</h3>

        {(channel || publishedDate) && (
          <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
            {channel && <span>{channel}</span>}
            {channel && publishedDate && (
              <span className="text-border" aria-hidden>
                &middot;
              </span>
            )}
            {publishedDate && <span>{publishedDate}</span>}
          </div>
        )}

        {description && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </article>
  )
}
