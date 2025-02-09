import { useQueryClient } from '@tanstack/react-query'
import { Row } from '@tanstack/react-table'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteAccounts } from '@/features/accounts/actions'
import { Account } from '@/features/accounts/types'

export default function useDeleteAccounts() {
	const [isDeleting, startDeleteTransition] = useTransition()
	const queryClient = useQueryClient()
	const handleDelete = (row: Row<Account>[]) => {
		startDeleteTransition(async () => {
			const ids = row.map((r) => r.original.id)
			const data = await deleteAccounts(ids)
			if (data && 'error' in data) {
				const errorText = `Error eliminando ${ids.length === 1 ? 'la cuenta' : 'las cuentas'}`
				toast.error(errorText)
				return
			}
			await queryClient.invalidateQueries({ queryKey: ['accounts'] })
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			const successText =
				ids.length === 1 ? 'Cuenta eliminada' : 'Cuentas eliminadas'
			toast.success(successText)
		})
	}

	return { isDeleting, handleDelete }
}
