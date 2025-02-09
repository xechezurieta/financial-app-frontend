import { useQuery } from '@tanstack/react-query'

import { getCategoriesAction } from '@/features/categories/actions'

export default function useGetCategories() {
	return useQuery({
		queryKey: ['categories'],
		queryFn: async () => await getCategoriesAction()
	})
}
