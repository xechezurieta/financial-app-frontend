import { useQuery } from '@tanstack/react-query'

import { getAccounts } from '@/features/accounts/actions'

export default function useGetAccounts() {
	return useQuery({
		queryKey: ['accounts'],
		queryFn: async () => await getAccounts()
	})
}
