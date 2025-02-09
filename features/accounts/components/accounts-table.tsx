'use client'

import { DataTable } from '@/components/table/data-table'
import { columns } from '@/features/accounts/components/colums'
import useDeleteAccounts from '@/features/accounts/hooks/use-delete-accounts'
import { Account } from '@/features/accounts/types'

export default function AccountsTable({ accounts }: { accounts: Account[] }) {
	const { isDeleting, handleDelete } = useDeleteAccounts()
	return (
		<DataTable
			filterKey='name'
			columns={columns}
			data={accounts}
			onDelete={handleDelete}
			disabled={isDeleting}
		/>
	)
}
