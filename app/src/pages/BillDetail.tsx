import { useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface BillData {
  title: string
  summary: string
  for: string
  against: string
}

export default function BillDetail() {
  const { billId } = useParams({ from: '/bills/$billId' })

  const { data, isLoading, isError } = useQuery<BillData>({
    queryKey: ['bill', billId],
    queryFn: async () => {
      const res = await fetch(`https://polengagementappbackend-u8euk.kinsta.app/summary?bill_id=${billId}`)
      if (!res.ok) throw new Error('Network error')
      return res.json()
    },
  })

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-8">Loading bill details...</p>
  }

  if (isError || !data) {
    return <p className="text-center text-red-500 mt-8">Error loading bill. Please try again later.</p>
  }

  const { title, summary, for: forText, against, moreInfoUrl } = data

  const extractBullets = (text: string) => {
    return text
      .split(/\n+/)
      .map(line => line.replace(/^[\d\-\*\•\.]*\s*/, '').trim())
      .filter(line => line.length > 0)
  }

  const forPoints = extractBullets(forText)
  const againstPoints = extractBullets(against)

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <a href="/" className="text-sm text-muted-foreground block">← Back</a>

      <Card className="p-4 space-y-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground whitespace-pre-line">{summary}</p>
      </Card>

      <section className="space-y-2">
        <h3 className="text-lg font-semibold">✔️ Arguments For</h3>
        <ul className="list-disc ml-5 text-sm space-y-1">
          {forPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-lg font-semibold">❌ Arguments Against</h3>
        <ul className="list-disc ml-5 text-sm space-y-1">
          {againstPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </section>

      <div className="text-center pt-4">
        <Button asChild className="w-full sm:w-auto">
          <a
            href={`https://legiscan.com/CA/text/AB246/id/3059536`} // <-- Replace this with actual value if your backend returns a URL
            target="_blank"
            rel="noopener noreferrer"
          >
            More Info
          </a>
        </Button>
      </div>
    </div>
  )
}
