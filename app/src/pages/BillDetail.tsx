import { useParams } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function BillDetail() {
  const { billId } = useParams({ from: '/bills/$billId' })

  // Simulated data for now — replace with actual fetch later
  const bill = {
    title: `Education Reform Act #${billId}`,
    summary: 'This bill proposes changes to public education funding and access, with emphasis on under-resourced communities.',
    for: {
      reasons: [
        'Improves access to quality education',
        'Increases teacher salaries',
      ],
      supporters: [
        {
          name: 'Rep. Aisha Thompson',
          imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
          name: 'Educators for Equity',
          imageUrl: 'https://via.placeholder.com/40x40?text=Org',
        },
      ],
    },
    against: {
      reasons: [
        'Increased taxes for middle-income households',
        'Concerns over federal overreach',
      ],
      opponents: [
        {
          name: 'Sen. Mark Davidson',
          imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
        },
        {
          name: 'Taxpayer Freedom Coalition',
          imageUrl: 'https://via.placeholder.com/40x40?text=Group',
        },
      ],
    },
    moreInfoUrl: `https://example.com/bills/${billId}`
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <a href="/" className="text-sm text-muted-foreground">← Back</a>

      <Card className="p-4 space-y-2">
        <h2 className="text-xl font-bold">{bill.title}</h2>
        <p className="text-sm text-muted-foreground">{bill.summary}</p>
      </Card>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">✔️ Supporters</h3>
        <ul className="list-disc ml-5 text-sm">
          {bill.for.reasons.map((reason, idx) => (
            <li key={idx}>{reason}</li>
          ))}
        </ul>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {bill.for.supporters.map((person, idx) => (
            <div key={idx} className="flex-shrink-0 text-center">
              <img
                src={person.imageUrl}
                alt={person.name}
                className="rounded-full w-12 h-12 mx-auto"
              />
              <p className="text-xs mt-1">{person.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">❌ Opponents</h3>
        <ul className="list-disc ml-5 text-sm">
          {bill.against.reasons.map((reason, idx) => (
            <li key={idx}>{reason}</li>
          ))}
        </ul>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {bill.against.opponents.map((person, idx) => (
            <div key={idx} className="flex-shrink-0 text-center">
              <img
                src={person.imageUrl}
                alt={person.name}
                className="rounded-full w-12 h-12 mx-auto"
              />
              <p className="text-xs mt-1">{person.name}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center pt-4">
        <Button asChild className="w-full sm:w-auto">
          <a href={bill.moreInfoUrl} target="_blank" rel="noopener noreferrer">
            More Info
          </a>
        </Button>
      </div>
    </div>
  )
}
