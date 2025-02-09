import { auth } from '@/app/(auth)/auth'
import { SummaryAnswer } from '@/features/summary/types'
import { convertAmountFromMiliunits, getAPIUrl } from '@/lib/utils'

export const getSummary = async ({
	from,
	to,
	accountId
}: {
	from: string | undefined
	to: string | undefined
	accountId: string
}) => {
	const session = await auth()
	if (!session) {
		throw new Error('Not authenticated')
	}
	const apiUrl = getAPIUrl('/summary')
	const params = new URLSearchParams()
	try {
		if (from) params.append('from', from)
		if (to) params.append('to', to)
		if (accountId) params.append('accountId', accountId)
		if (session?.user?.id) params.append('userId', session.user.id)
		const url = `${apiUrl}?${params.toString()}`
		console.log(url)
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (!response.ok) {
			throw new Error('Error fetching summary')
		}
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
		throw new Error('Error fetching summary')
	}
}
