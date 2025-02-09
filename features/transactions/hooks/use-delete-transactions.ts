import { useQueryClient } from '@tanstack/react-query'
import { Row } from '@tanstack/react-table'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteTransactions } from '@/features/transactions/actions'
import { Transaction } from '@/features/transactions/types'

export default function useDeleteTransactions() {
	const [isDeleting, startDeleteTransition] = useTransition()
	const queryClient = useQueryClient()
	const handleDelete = (row: Row<Transaction>[]) => {
		startDeleteTransition(async () => {
			const ids = row.map((r) => r.original.id)
			const data = await deleteTransactions(ids)
			if (data && 'error' in data) {
				const errorText = `Error eliminando ${ids.length === 1 ? 'la transacción' : 'las transacciones'}`
				toast.error(errorText)
				return
			}
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			const successText =
				ids.length === 1 ? 'Transacción eliminada' : 'Transacciones eliminadas'
			toast.success(successText)
		})
	}

	return { isDeleting, handleDelete }
}
