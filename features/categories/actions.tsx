'use server'

import { revalidatePath } from 'next/cache'

import { getCategories } from '@/features/categories/categories-api'
import { Category } from '@/features/categories/types'
import { getAPIUrl } from '@/lib/utils'
import { getSession } from '@/lib/session'
import { headers } from 'next/headers'

export const createCategory = async (name: string) => {
	const session = await getSession()
	if (!session) return
	const apiUrl = getAPIUrl('/categories')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(await headers())
			},
			body: JSON.stringify({
				name
			}),
			credentials: 'include'
		})
		if (!response.ok) {
			return { error: 'Error creating category' }
		}
		const data: { category: Category } = await response.json()
		revalidatePath('/categories')
		revalidatePath('/transactions')
		return data
	} catch (error) {
		return { error: 'Error creating category' }
	}
}

export const deleteCategories = async (categoryIds: Array<string>) => {
	const session = await getSession()
	if (!session) return
	const apiUrl = getAPIUrl('/categories')
	try {
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				...(await headers())
			},
			body: JSON.stringify({
				userId: session.user?.id,
				categoryIds
			})
		})
		if (!response.ok) {
			return { error: 'Error deleting categories' }
		}
		const data: { deletedCategories: Array<string> } = await response.json()
		revalidatePath('/categories')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting categories' }
	}
}

export const getCategory = async (categoryId: string) => {
	const session = await getSession()
	if (!session) return
	const apiUrl = getAPIUrl(`/categories/${categoryId}`)
	try {
		const response = await fetch(apiUrl, {
			method: 'GET',
			credentials: 'include',
			headers: {
				...(await headers())
			}
		})
		if (!response.ok) {
			return { error: 'Error getting category' }
		}
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
	const session = await getSession()
	if (!session) return
	const apiUrl = getAPIUrl(`/categories/${categoryId}`)
	try {
		const response = await fetch(apiUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				...(await headers())
			},
			body: JSON.stringify({
				userId: session.user?.id,
				categoryId,
				name
			})
		})
		if (!response.ok) {
			return { error: 'Error updating category' }
		}
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
	const session = await getSession()
	if (!session) return
	const apiUrl = getAPIUrl(`/categories/${categoryId}`)
	try {
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				...(await headers())
			},
			body: JSON.stringify({
				userId: session.user?.id
			}),
			credentials: 'include'
		})
		if (!response.ok) {
			return { error: 'Error deleting category' }
		}
		const data: { category: Category } = await response.json()
		revalidatePath('/categories')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting category' }
	}
}

export const getCategoriesAction = async () => {
	const session = await getSession()
	if (!session) throw new Error('No session')

	try {
		const categories = await getCategories()
		if (!categories) {
			throw new Error('Error getting categories')
		}
		return categories
	} catch (error) {
		return { error: 'Error getting categories' }
	}
}
