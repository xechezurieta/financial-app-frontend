import { toast } from 'sonner'

import { getCategories } from '@/features/categories/categories-api'
import CategoriesTable from '@/features/categories/components/categories-table'

export default async function CategoriesTableWrapper() {
	const data = await getCategories()
	if (data && 'error' in data) {
		toast.error('Ha ocurrido un error obteniendo las categorías')
		return null
	}
	return <CategoriesTable categories={data.categories} />
}
