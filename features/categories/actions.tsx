'use server'
import { revalidatePath } from 'next/cache'
import { getCategories } from '@/features/categories/categories-api'
import { Category } from '@/features/categories/types'
import { getAPIUrl } from '@/lib/utils'
import { cookies } from 'next/headers'

export const createCategory = async (name: string) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl('/categories')
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			},
			body: JSON.stringify({
				name
			})
		})
		if (!response.ok) return { error: 'Error creating category' }

		const data: { category: Category } = await response.json()
		revalidatePath('/categories')
		revalidatePath('/transactions')
		return data
	} catch (error) {
		return { error: 'Error creating category' }
	}
}

export const deleteCategories = async (categoryIds: Array<string>) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl('/categories')
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			},
			body: JSON.stringify({
				categoryIds
			})
		})
		if (!response.ok) return { error: 'Error deleting categories' }

		const data: { deletedCategories: Array<{ id: string }> } =
			await response.json()
		revalidatePath('/categories')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting categories' }
	}
}

export const getCategory = async (categoryId: string) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl(`/categories/${categoryId}`)
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session}`
			}
		})
		if (!response.ok) return { error: 'Error getting category' }

		const data: { category: Category } = await response.json()
		return data
	} catch (error) {
		return { error: 'Error getting category' }
	}
}

export const editCategoryName = async ({
	name,
	categoryId
}: {
	name: string
	categoryId: string
}) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl(`/categories/${categoryId}`)
		const response = await fetch(apiUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			},
			body: JSON.stringify({
				name
			})
		})
		if (!response.ok) return { error: 'Error updating category' }

		const data: { category: Category } = await response.json()
		revalidatePath('/categories')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error updating category' }
	}
}

export const deleteCategory = async (categoryId: string) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl(`/categories/${categoryId}`)
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			}
		})
		if (!response.ok) return { error: 'Error deleting category' }

		const data: { deletedCategory: { id: string } } = await response.json()
		revalidatePath('/categories')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting category' }
	}
}

export const getCategoriesAction = async () => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const categories = await getCategories()
		if (!categories) throw new Error('Error getting categories')

		return categories
	} catch (error) {
		return { error: 'Error getting categories' }
	}
}
