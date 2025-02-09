import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import CategoryForm from '@/features/categories/components/category-form'
import useCreateCategory from '@/features/categories/hooks/use-create-category'
import { useNewCategory } from '@/features/categories/stores/use-new-category'

export default function NewCategorySheet() {
	const { isOpen, onClose } = useNewCategory()
	const { isCreatingCategory, onSubmit } = useCreateCategory(onClose)
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>Nueva categoría</SheetTitle>
					<SheetDescription>
						Crea una nueva categoría para empezar controlar tus transacciones.
					</SheetDescription>
				</SheetHeader>
				<CategoryForm
					onSubmit={onSubmit}
					disabled={isCreatingCategory}
					defaultValues={{
						name: ''
					}}
				/>
			</SheetContent>
		</Sheet>
	)
}
