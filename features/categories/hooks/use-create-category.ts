import { useQueryClient } from '@tanstack/react-query'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { createCategory } from '@/features/categories/actions'

export default function useCreateCategory(onClose?: () => void) {
	const [isCreatingCategory, createCategoryTransition] = useTransition()
	const queryClient = useQueryClient()
	const onSubmit = ({ name }: { name: string }) => {
		createCategoryTransition(async () => {
			const category = await createCategory(name)
			if (category && 'error' in category) {
				toast.error('Error creando la categoría')
				return
			}
			await queryClient.invalidateQueries({ queryKey: ['categories'] })
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			toast.success('Categoría creada')
			onClose?.()
		})
	}
	return { isCreatingCategory, onSubmit }
}
