import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card'; // Adjust imports based on your setup
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebounce } from '../helpers/useDebounce';
import { useNavigate } from '@tanstack/react-router';


// Simulate fetching topics from backend
async function fetchBills(query: string) {
  if (!query) return []
  const res = await fetch(`https://polengagementappbackend-u8euk.kinsta.app/search?state=CA&query=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Network error')
  return res.json() // Assume it returns array of { id, title }

}

export default function BillSearch() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const {
    data: bills,
    isLoading,
    isError,
    refetch,
  } = useQuery({
  queryKey: ['topics', debouncedSearch],
  queryFn: () => fetchBills(debouncedSearch),
  enabled: !!debouncedSearch,
  staleTime: 1000 * 60 * 5,
  placeholderData: (previousData) => previousData,
})


  function onClickBill(billId: string) {
    navigate({ to: '/bills/$billId', params: { billId } })
    // replace with your routing/navigation logic
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <Input
        type="search"
        placeholder="Search topics (e.g. education)"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {isError && (
        <p className="text-center text-red-500">
          Error fetching bills. Try again.
          <Button variant="ghost" size="sm" onClick={() => refetch()} className="ml-2">
            Retry
          </Button>
        </p>
      )}

      <div className="space-y-3">
        {bills?.length === 0 && debouncedSearch && !isLoading && (
          <p className="text-center text-gray-400">No results for "{debouncedSearch}"</p>
        )}
        {bills?.map(({ id, title }: { id: string; title: string }) => (
          <Card
            key={id}
            className="cursor-pointer p-4 hover:bg-gray-100"
            onClick={() => onClickBill(id)}
          >
            <h3 className="font-semibold text-lg">{title}</h3>
          </Card>
        ))}
      </div>
    </div>
  )
}
