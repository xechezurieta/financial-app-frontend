export type SummaryAnswer = {
	data: {
		remainingAmount: number
		remainingChange: number
		incomeAmount: number
		incomeChange: number
		expensesAmount: number
		expensesChange: number
		categories: { name: string; value: number }[]
		days: { date: Date; income: number; expenses: number }[]
	}
}
