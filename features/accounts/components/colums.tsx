import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import AccountActions from '@/features/accounts/components/account-actions'
import { Account } from '@/features/accounts/types'
export type Payment = {
	id: string
	amount: number
	status: 'pending' | 'processing' | 'success' | 'failed'
	email: string
}
export const columns: ColumnDef<Account>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Nombre
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => <AccountActions id={row.original.id} />
	}
]
