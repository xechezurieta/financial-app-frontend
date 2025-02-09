export type Transaction = {
	id: string
	accountId: string
	account: string | null
	categoryId: string | null
	category: string | null
	userId: string
	date: Date
	payee: string
	amount: number
	notes: string | null
}
