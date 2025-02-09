import { useQueryClient } from '@tanstack/react-query'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { createAccount } from '@/features/accounts/actions'

export default function useCreateAccount(onClose?: () => void) {
	const [isCreatingAccount, createAccountTransition] = useTransition()
	const queryClient = useQueryClient()
	const onSubmit = ({ name }: { name: string }) => {
		createAccountTransition(async () => {
			const account = await createAccount(name)
			if (account && 'error' in account) {
				toast.error('Error creando la cuenta')
				return
			}
			await queryClient.invalidateQueries({ queryKey: ['accounts'] })
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			toast.success('Cuenta creada')
			onClose?.()
		})
	}
	return { isCreatingAccount, onSubmit }
}
