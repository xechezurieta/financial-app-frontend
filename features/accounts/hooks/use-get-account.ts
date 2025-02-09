import { useQuery } from '@tanstack/react-query'

import { getAccount } from '@/features/accounts/actions'

export default function useGetAccount({ id }: { id: string | undefined }) {
	return useQuery({
		queryKey: ['account', id],
		queryFn: () => getAccount(id || ''),
		enabled: !!id
	})
}
