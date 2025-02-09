import { useQueryClient } from '@tanstack/react-query'
import { Row } from '@tanstack/react-table'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteCategories } from '@/features/categories/actions'
import { Category } from '@/features/categories/types'

export default function useDeleteCategories() {
	const [isDeleting, startDeleteTransition] = useTransition()
	const queryClient = useQueryClient()
	const handleDelete = (row: Row<Category>[]) => {
		startDeleteTransition(async () => {
			const ids = row.map((r) => r.original.id)
			const data = await deleteCategories(ids)
			if (data && 'error' in data) {
				const errorText = `Error eliminando ${ids.length === 1 ? 'la categoría' : 'las categorías'}`
				toast.error(errorText)
				return
			}
			await queryClient.invalidateQueries({ queryKey: ['categories'] })
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			const successText =
				ids.length === 1 ? 'Categoría eliminada' : 'Categorías eliminadas'
			toast.success(successText)
		})
	}
	return { isDeleting, handleDelete }
}
