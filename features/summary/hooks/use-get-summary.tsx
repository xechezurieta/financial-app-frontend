import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getSummary } from '@/features/summary/actions'

export default function useGetSummary() {
	const params = useSearchParams()
	const from = params.get('from') || ''
	const to = params.get('to') || ''
	const accountId = params.get('accountId') || ''
	return useQuery({
		queryKey: ['summary', { from, to, accountId }],
		queryFn: async () =>
			await getSummary({
				from,
				to,
				accountId
			})
	})
}
