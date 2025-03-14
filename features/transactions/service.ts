import { Transaction } from '@/features/transactions/types'
import { convertAmountFromMiliunits, getAPIUrl } from '@/lib/utils'
import { cookies } from 'next/headers'

export const getTransactions = async ({
	from,
	to,
	accountId
}: {
	from: string | undefined
	to: string | undefined
	accountId: string
}) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		let baseUrl = `/transactions?accountId=${accountId}`
		if (from) baseUrl += `&from=${from}`
		if (to) baseUrl += `&to=${to}`
		const apiUrl = getAPIUrl(baseUrl)
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			}
		})
		if (!response.ok) throw new Error('Error getting transactions')

		const data: { transactions: Transaction[] } = await response.json()
		const parsedData = {
			transactions: data.transactions.map((transaction) => ({
				...transaction,
				amount: convertAmountFromMiliunits(transaction.amount)
			}))
		}
		return parsedData
	} catch (error) {
		return { error: 'Error getting transactions' }
	}
}
