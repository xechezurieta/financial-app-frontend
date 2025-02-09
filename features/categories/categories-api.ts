import { Category } from '@/features/categories/types'
import { getAPIUrl } from '@/lib/utils'

export const getCategories = async () => {
	const apiUrl = getAPIUrl('/categories')
	try {
		const response = await fetch(apiUrl)
		if (!response.ok) {
			throw new Error('Error getting categories')
		}
		const data: { categories: Category[] } = await response.json()
		return data
	} catch (error) {
		console.error(error)
		return { error: 'Error getting categories' }
	}
}
