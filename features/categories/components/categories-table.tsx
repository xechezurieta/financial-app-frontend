'use client'
import { DataTable } from '@/components/table/data-table'
import { columns } from '@/features/categories/components/colums'
import useDeleteCategories from '@/features/categories/hooks/use-delete-categories'
import { Category } from '@/features/categories/types'

export default function CategoriesTable({
	categories
}: {
	categories: Category[]
}) {
	const { isDeleting, handleDelete } = useDeleteCategories()
	return (
		<DataTable
			filterKey='name'
			columns={columns}
			data={categories}
			onDelete={handleDelete}
			disabled={isDeleting}
		/>
	)
}
