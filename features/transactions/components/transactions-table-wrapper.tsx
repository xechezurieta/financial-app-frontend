import { toast } from 'sonner'

import TransactionsTable from '@/features/transactions/components/transactions-table'
import { getTransactions } from '@/features/transactions/service'

export default async function TransactionsTableWrapper({
	params
}: {
	params: { from?: string; to?: string; accountId?: string }
}) {
	const to = params?.to || undefined
	const from = params?.from || undefined
	const accountId = params?.accountId || undefined
	const data = await getTransactions({
		from,
		to,
		accountId: accountId || '',
		userId: '1'
	})
	if (data && 'error' in data) {
		toast.error('Ha ocurrido un error obteniendo las transacciones')
		return null
	}
	return <TransactionsTable transactions={data.transactions} />
}
