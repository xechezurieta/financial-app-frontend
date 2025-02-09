import { useQueryClient } from '@tanstack/react-query'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteAccount } from '@/features/accounts/actions'

export default function useDeleteAccount() {
	const [isDeletingAccount, deleteAccountTransition] = useTransition()
	const queryClient = useQueryClient()
	const handleDelete = ({
		id,
		onClose
	}: {
		id: string
		onClose?: () => void
	}) => {
		deleteAccountTransition(async () => {
			const data = await deleteAccount(id)
			if (data && 'error' in data) {
				toast.error('Error eliminando la cuenta')
				return
			}
			await queryClient.invalidateQueries({ queryKey: ['accounts'] })
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			toast.success('Cuenta eliminada')
			onClose?.()
		})
	}

	return { isDeletingAccount, handleDelete }
}
