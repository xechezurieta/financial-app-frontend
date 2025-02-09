'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/app/(auth)/auth'
import { Transaction } from '@/features/transactions/types'
import { convertAmountFromMiliunits, getAPIUrl } from '@/lib/utils'

export const createTransaction = async ({
	userId,
	date,
	categoryId,
	payee,
	amount,
	notes,
	accountId
}: {
	userId: string
	date: Date
	categoryId: string
	payee: string
	amount: number
	notes: string
	accountId: string
}) => {
	const session = await auth()
	if (!session) return { error: 'Error creating transaction' }
	const apiUrl = getAPIUrl('/transactions/create')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id,
				date,
				categoryId,
				payee,
				amount,
				notes,
				accountId
			})
		})
		console.log({ response })
		if (!response.ok) {
			return { error: 'Error creating transaction' }
		}
		const data: { transaction: Transaction } = await response.json()
		console.log('QUE LLEGA ', { data })
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error creating transaction' }
	}
}

export const deleteTransactions = async (transactionIds: Array<string>) => {
	const session = await auth()
	if (!session) return
	const apiUrl = getAPIUrl('/transactions/bulk-delete')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id,
				transactionIds
			})
		})
		if (!response.ok) {
			return { error: 'Error deleting transactions' }
		}
		const data: { deletedTransactions: Array<string> } = await response.json()
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting transactions' }
	}
}

export const getTransaction = async (transactionId: string) => {
	const session = await auth()
	if (!session) return
	const apiUrl = getAPIUrl('/transactions/transaction')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id,
				transactionId
			})
		})
		if (!response.ok) {
			return { error: 'Error getting transaction' }
		}
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
	const session = await auth()
	if (!session) return
	const apiUrl = getAPIUrl('/transactions')
	try {
		const response = await fetch(apiUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id,
				transactionId,
				date,
				categoryId,
				payee,
				amount,
				notes,
				accountId
			})
		})
		if (!response.ok) {
			return { error: 'Error updating transaction' }
		}
		const data: { transaction: Transaction } = await response.json()
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error updating transaction' }
	}
}

export const deleteTransaction = async (transactionId: string) => {
	const session = await auth()
	if (!session) return
	const apiUrl = getAPIUrl('/transactions/single-delete')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id,
				transactionId
			})
		})
		if (!response.ok) {
			return { error: 'Error deleting transaction' }
		}
		const data: { deletedTransaction: string } = await response.json()
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting transaction' }
	}
}
