'use client'

import { DataTable } from '@/components/table/data-table'
import { columns } from '@/features/transactions/components/colums'
import useDeleteTransactions from '@/features/transactions/hooks/use-delete-transactions'
import { Transaction } from '@/features/transactions/types'

export default function TransactionsTable({
	transactions
}: {
	transactions: Transaction[]
}) {
	const { isDeleting, handleDelete } = useDeleteTransactions()
	return (
		<DataTable
			filterKey='payee'
			columns={columns}
			data={transactions}
			onDelete={handleDelete}
			disabled={isDeleting}
		/>
	)
}
