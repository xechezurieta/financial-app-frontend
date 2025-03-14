'use server'

import { revalidatePath } from 'next/cache'
import { Transaction } from '@/features/transactions/types'
import { convertAmountFromMiliunits, getAPIUrl } from '@/lib/utils'
import { cookies } from 'next/headers'

export const createTransaction = async ({
	date,
	categoryId,
	payee,
	amount,
	notes,
	accountId
}: {
	date: Date
	categoryId: string
	payee: string
	amount: number
	notes: string
	accountId: string
}) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl('/transactions')
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			},
			body: JSON.stringify({
				date,
				categoryId,
				payee,
				amount,
				notes,
				accountId
			})
		})
		if (!response.ok) return { error: 'Error creating transaction' }

		const data: { transaction: Transaction } = await response.json()
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error creating transaction' }
	}
}

export const deleteTransactions = async (transactionIds: Array<string>) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl('/transactions')
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			},
			body: JSON.stringify({
				transactionIds
			})
		})
		if (!response.ok) return { error: 'Error deleting transactions' }

		const data: { deletedTransactions: Array<{ id: string }> } =
			await response.json()
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting transactions' }
	}
}

export const getTransaction = async (transactionId: string) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl(`/transactions/${transactionId}`)
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session}`
			}
		})
		if (!response.ok) return { error: 'Error getting transaction' }

		const data: { transaction: Transaction } = await response.json()
		const parsedData = {
			transaction: {
				...data.transaction,
				amount: convertAmountFromMiliunits(data.transaction.amount)
			}
		}
		return parsedData
	} catch (error) {
		return { error: 'Error getting transaction' }
	}
}

export const updateTransaction = async ({
	transactionId,
	date,
	categoryId,
	payee,
	amount,
	notes,
	accountId
}: {
	transactionId: string
	date: Date
	categoryId: string | null | undefined
	payee: string
	amount: number
	notes: string | null | undefined
	accountId: string
}) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl(`/transactions/${transactionId}`)
		const response = await fetch(apiUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			},
			body: JSON.stringify({
				transactionId,
				date,
				categoryId,
				payee,
				amount,
				notes,
				accountId
			})
		})
		if (!response.ok) return { error: 'Error updating transaction' }

		const data: { transaction: Transaction } = await response.json()
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error updating transaction' }
	}
}

export const deleteTransaction = async (transactionId: string) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl(`/transactions/${transactionId}`)
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			}
		})
		if (!response.ok) return { error: 'Error deleting transaction' }

		const data: { deletedTransaction: string } = await response.json()
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting transaction' }
	}
}
