import { useTransition } from 'react'
import { toast } from 'sonner'

import { updateTransaction } from '@/features/transactions/actions'

export default function useEditTransaction() {
	const [isEditingTransaction, editTransactionTransition] = useTransition()
	const handleEdit = ({
		id,
		date,
		categoryId,
		payee,
		amount,
		notes,
		accountId,
		userId,
		onClose
	}: {
		id: string
		date: Date
		categoryId?: string | null
		payee: string
		amount: string
		notes?: string | null
		accountId: string
		userId: string
		onClose?: () => void
	}) => {
		editTransactionTransition(async () => {
			const transaction = await updateTransaction({
				transactionId: id,
				date,
				categoryId,
				payee,
				amount: +amount,
				notes,
				accountId
			})
			if (transaction && 'error' in transaction) {
				toast.error('Error editando la transacción')
				return
			}
			onClose?.()
			toast.success('Transacción editada')
		})
	}
	return { isEditingTransaction, handleEdit }
}
