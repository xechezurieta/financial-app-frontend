import { useQueryClient } from '@tanstack/react-query'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteCategory } from '@/features/categories/actions'

export default function useDeleteCategory() {
	const [isDeletingCategory, deleteCategoryTransition] = useTransition()
	const queryClient = useQueryClient()
	const handleDelete = ({
		id,
		onClose
	}: {
		id: string
		onClose?: () => void
	}) => {
		deleteCategoryTransition(async () => {
			const data = await deleteCategory(id)
			if (data && 'error' in data) {
				toast.error('Error eliminando la categoría')
				return
			}
			await queryClient.invalidateQueries({ queryKey: ['categories'] })
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			toast.success('Categoría eliminada')
			onClose?.()
		})
	}

	return { isDeletingCategory, handleDelete }
}
