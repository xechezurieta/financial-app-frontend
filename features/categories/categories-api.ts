import { Category } from '@/features/categories/types'
import { getAPIUrl } from '@/lib/utils'
import { cookies } from 'next/headers'

export const getCategories = async () => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl('/categories')
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session}`
			}
		})
		if (!response.ok) throw new Error('Error getting categories')

		const data: { categories: Category[] } = await response.json()
		return data
	} catch (error) {
		console.error(error)
		return { error: 'Error getting categories' }
	}
}
