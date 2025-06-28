import { useParams } from '@tanstack/react-router'

export default function BillDetail() {
  const { billId } = useParams({ from: '/bills/$billId' }) // 👈 USE ID, NOT PATH

  const bill = {
    title: `Details for Bill ${billId}`,
    description: `This is the in-depth content for bill ID: ${billId}.`,
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <a href="/" className="text-sm text-muted-foreground">← Back</a>
      <div className="p-4 rounded-lg border bg-card">
        <h2 className="text-xl font-semibold">{bill.title}</h2>
        <p className="text-sm text-muted-foreground">{bill.description}</p>
      </div>
    </div>
  )
}
