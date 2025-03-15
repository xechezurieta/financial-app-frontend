'use server'

import { SummaryAnswer } from '@/features/summary/types'
import { convertAmountFromMiliunits, getAPIUrl } from '@/lib/utils'
import { cookies } from 'next/headers'

export const getSummary = async ({
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

		const apiUrl = getAPIUrl('/summary')
		const params = new URLSearchParams()
		if (from) params.append('from', from)
		if (to) params.append('to', to)
		if (accountId) params.append('accountId', accountId)
		const url = `${apiUrl}?${params.toString()}`
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session}`
			}
		})
		if (!response.ok) throw new Error('Error fetching summary')

		const data: SummaryAnswer = await response.json()
		const parsedData = {
			...data.data,
			incomeAmount: convertAmountFromMiliunits(data.data.incomeAmount),
			expensesAmount: convertAmountFromMiliunits(data.data.expensesAmount),
			remainingAmount: convertAmountFromMiliunits(data.data.remainingAmount),
			categories: data.data.categories.map((category) => ({
				...category,
				value: convertAmountFromMiliunits(category.value)
			})),
			days: data.data.days.map((day) => ({
				...day,
				income: convertAmountFromMiliunits(day.income),
				expenses: convertAmountFromMiliunits(day.expenses)
			}))
		}
		return parsedData
	} catch (error) {
		return { error: 'Error fetching summary' }
	}
}
