import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import DataTableLoader from '@/components/table/data-table-loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CategoriesTableWrapper from '@/features/categories/components/categories-table-wrapper'
import NewCategory from '@/features/categories/components/new-category'
import { getSession } from '@/lib/session'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
	const session = await getSession()
	if (!session) {
		redirect('/login')
	}
	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
				<CardTitle className='line-clamp-1 text-xl'>
					Página de categorías
				</CardTitle>
				<NewCategory />
			</CardHeader>
			<CardContent>
				<Suspense fallback={<DataTableLoader />}>
					<CategoriesTableWrapper />
				</Suspense>
			</CardContent>
		</Card>
	)
}
