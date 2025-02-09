import { useQuery } from '@tanstack/react-query'

import { getTransaction } from '@/features/transactions/actions'

export default function useGetTransaction({ id }: { id: string | undefined }) {
	return useQuery({
		queryKey: ['transaction', id],
		queryFn: () => getTransaction(id || ''),
		enabled: !!id
	})
}
