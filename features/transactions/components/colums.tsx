import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import AccountColumn from '@/features/transactions/components/account-column'
import CategoryColumn from '@/features/transactions/components/category-column'
import TransactionActions from '@/features/transactions/components/transaction-actions'
import { Transaction } from '@/features/transactions/types'
import formatCurrency from '@/lib/utils'

export const columns: ColumnDef<Transaction>[] = [
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
		accessorKey: 'date',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Fecha
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const date = row.getValue('date') as Date
			return <span>{format(date, 'yyyy-MM-dd')}</span>
		}
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Categoría
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			return (
				<CategoryColumn
					id={row.original.id}
					category={row.original.category}
					categoryId={row.original.categoryId}
				/>
			)
		}
	},
	{
		accessorKey: 'payee',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Beneficiario
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Cantidad
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'))
			return (
				<Badge
					variant={amount < 0 ? 'destructive' : 'primary'}
					className='text-xs font-medium px-3 py-2'
				>
					{formatCurrency(amount)}
				</Badge>
			)
		}
	},
	{
		accessorKey: 'account',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Cuenta
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			return (
				<AccountColumn
					account={row.original.account || 'Sin cuenta'}
					accountId={row.original.accountId || ''}
				/>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => <TransactionActions id={row.original.id} />
	}
]
