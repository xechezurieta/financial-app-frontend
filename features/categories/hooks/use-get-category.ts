import { useQuery } from '@tanstack/react-query'

import { getCategory } from '@/features/categories/actions'

export default function useGetCategory({ id }: { id: string | undefined }) {
	return useQuery({
		queryKey: ['category', id],
		queryFn: () => getCategory(id || ''),
		enabled: !!id
	})
}
