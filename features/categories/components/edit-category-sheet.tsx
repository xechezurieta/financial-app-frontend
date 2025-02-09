import LoadingContainer from '@/components/loading-container'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import CategoryForm from '@/features/categories/components/category-form'
import useDeleteCategory from '@/features/categories/hooks/use-delete-category'
import useEditCategory from '@/features/categories/hooks/use-edit-category'
import useGetCategory from '@/features/categories/hooks/use-get-category'
import { useOpenCategory } from '@/features/categories/stores/use-open-category'
import { useConfirm } from '@/hooks/use-confirm'

export default function EditCategorySheet() {
	const { confirm, ConfirmDialog } = useConfirm({
		title: 'Eliminar categoría',
		description: '¿Estás seguro de que quieres eliminar esta categoría?'
	})
	const { isOpen, onClose, id } = useOpenCategory()
	const { handleEdit, isEditingCategory } = useEditCategory()
	const { handleDelete, isDeletingCategory } = useDeleteCategory()

	const { data, isPending } = useGetCategory({ id })
	const category = data && 'category' in data ? data.category : null

	const onSubmit = ({ name }: { name: string }) => {
		if (!id) return
		handleEdit({ name, id, onClose })
	}

	const onDelete = async () => {
		if (!id) return
		const confirmed = await confirm()
		if (!confirmed) return
		handleDelete({ id, onClose })
	}

	return (
		<>
			<ConfirmDialog />
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent className='space-y-4'>
					<SheetHeader>
						<SheetTitle>Editar categoría</SheetTitle>
						<SheetDescription>
							Modifica los datos de tu categoría.
						</SheetDescription>
					</SheetHeader>
					{isPending ? (
						<LoadingContainer />
					) : (
						<CategoryForm
							id={id}
							onSubmit={onSubmit}
							disabled={isEditingCategory || isPending || isDeletingCategory}
							defaultValues={{
								name: category?.name || ''
							}}
							onDelete={onDelete}
						/>
					)}
				</SheetContent>
			</Sheet>
		</>
	)
}
