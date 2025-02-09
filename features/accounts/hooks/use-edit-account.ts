import { useQueryClient } from '@tanstack/react-query'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { editAccountName } from '@/features/accounts/actions'

export default function useEditAccount() {
	const [isEditingAccount, editAccountTransition] = useTransition()
	const queryClient = useQueryClient()
	const handleEdit = ({
		name,
		id,
		onClose
	}: {
		name: string
		id: string
		onClose?: () => void
	}) => {
		editAccountTransition(async () => {
			const account = await editAccountName({ name, accountId: id })
			if (account && 'error' in account) {
				toast.error('Error editando la cuenta')
				return
			}
			await queryClient.invalidateQueries({ queryKey: ['accounts'] })
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			await queryClient.invalidateQueries({ queryKey: ['account', id] })
			toast.success('Cuenta editada')
			onClose?.()
		})
	}
	return { isEditingAccount, handleEdit }
}
