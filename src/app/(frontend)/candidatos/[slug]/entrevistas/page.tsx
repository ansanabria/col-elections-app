import Link from 'next/link'
import { notFound } from 'next/navigation'

import { YouTubeCard } from '@/components/site/YouTubeCard'
import { Button } from '@/components/ui/button'
import { getCandidateBySlug } from '@/lib/candidates'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function EntrevistasPage({ params }: Props) {
  const { slug } = await params
  const candidate = await getCandidateBySlug(slug)

  if (!candidate) {
    notFound()
  }

  const interviews = candidate.interviewItems ?? []

  return (
    <div>
      <div className="mb-4">
        <Button asChild variant="link" className="px-0">
          <Link href={`/candidatos/${candidate.slug}`}>← Volver al perfil de {candidate.name}</Link>
        </Button>
      </div>

      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/candidatos" className="transition-colors hover:text-foreground">
          Candidatos
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={`/candidatos/${candidate.slug}`}
          className="transition-colors hover:text-foreground"
        >
          {candidate.name}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground">Entrevistas</span>
      </nav>

      <header className="mb-10 border-b border-border pb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Entrevistas
        </p>
        <h1 className="text-3xl leading-tight">{candidate.name}</h1>
        <p className="mt-1 text-muted-foreground">{candidate.party}</p>
      </header>

      {interviews.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interviews.map((item) => (
            <YouTubeCard
              key={item.id ?? item.youtubeUrl}
              title={item.title}
              youtubeUrl={item.youtubeUrl}
              description={item.description}
              publishedDate={item.publishedDate}
              channel={item.channel}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">
            No hay entrevistas registradas para este candidato aún.
          </p>
        </div>
      )}
    </div>
  )
}
