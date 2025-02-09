import { useQueryClient } from '@tanstack/react-query'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { editCategoryName } from '@/features/categories/actions'

export default function useEditCategory() {
	const [isEditingCategory, editCategoryTransition] = useTransition()
	const queryClient = useQueryClient()
	const handleEdit = ({
		id,
		name,
		onClose
	}: {
		id: string
		name: string
		onClose?: () => void
	}) => {
		editCategoryTransition(async () => {
			const category = await editCategoryName({ categoryId: id, name })
			if (category && 'error' in category) {
				toast.error('Error editando la categoría')
				return
			}
			await queryClient.invalidateQueries({ queryKey: ['categories'] })
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			await queryClient.invalidateQueries({ queryKey: ['category', id] })
			toast.success('Categoría editada')
			onClose?.()
		})
	}
	return { isEditingCategory, handleEdit }
}
