import { Edit, MoreHorizontal, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useDeleteCategory from '@/features/categories/hooks/use-delete-category'
import { useOpenCategory } from '@/features/categories/stores/use-open-category'
import { useConfirm } from '@/hooks/use-confirm'

export default function CategoryActions({ id }: { id: string }) {
	const { ConfirmDialog, confirm } = useConfirm({
		title: 'Eliminar categoría',
		description: '¿Estás seguro de que quieres eliminar esta categoría?'
	})
	const { onOpen } = useOpenCategory()
	const { isDeletingCategory, handleDelete } = useDeleteCategory()

	const onDelete = async () => {
		if (!id) return
		const confirmed = await confirm()
		if (!confirmed) return
		handleDelete({ id })
	}

	return (
		<>
			<ConfirmDialog />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='size-8 p-0'>
						<MoreHorizontal className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						disabled={isDeletingCategory}
						onClick={() => onOpen(id)}
					>
						<Edit className='mr-2 size-4' />
						Editar
					</DropdownMenuItem>

					<DropdownMenuItem disabled={isDeletingCategory} onClick={onDelete}>
						<Trash className='mr-2 size-4' />
						Eliminar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
