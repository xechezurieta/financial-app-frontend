import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { deleteTransaction } from '@/features/transactions/actions'
import { useOpenTransaction } from '@/features/transactions/stores/use-open-transaction'
import { useConfirm } from '@/hooks/use-confirm'

export default function TransactionActions({ id }: { id: string }) {
	const { ConfirmDialog, confirm } = useConfirm({
		title: 'Eliminar transacción',
		description: '¿Estás seguro de que quieres eliminar esta transacción?'
	})
	const { onOpen } = useOpenTransaction()
	const [isDeletingTransaction, deleteTransactionTransition] = useTransition()

	const onDelete = async () => {
		if (!id) return
		const confirmed = await confirm()
		if (!confirmed) return
		deleteTransactionTransition(async () => {
			const transaction = await deleteTransaction(id)
			if (transaction && 'error' in transaction) {
				toast.error('Error eliminando la transacción')
				return
			}
			toast.success('Transacción eliminada')
		})
	}

	return (
		<>
			<ConfirmDialog />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='size-8 p-0'>
						<MoreHorizontal className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						disabled={isDeletingTransaction}
						onClick={() => onOpen(id)}
					>
						<Edit className='mr-2 size-4' />
						Editar
					</DropdownMenuItem>

					<DropdownMenuItem disabled={isDeletingTransaction} onClick={onDelete}>
						<Trash className='mr-2 size-4' />
						Eliminar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
