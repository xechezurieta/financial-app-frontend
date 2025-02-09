'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useNewCategory } from '@/features/categories/stores/use-new-category'

export default function NewCategory() {
	const newCategory = useNewCategory()
	return (
		<Button onClick={newCategory.onOpen} size='sm'>
			<Plus className='size-4 mr-2' />
			Añadir nueva categoría
		</Button>
	)
}
