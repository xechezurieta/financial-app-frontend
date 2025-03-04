import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import DataTableLoader from '@/components/table/data-table-loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NewTransaction from '@/features/transactions/components/new-transaction'
import TransactionsTableWrapper from '@/features/transactions/components/transactions-table-wrapper'
import { getSession } from '@/features/auth/service'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function TransactionsPage(props: {
	searchParams: SearchParams
}) {
	const session = await getSession()
	if (!session) {
		redirect('/login')
	}
	const params = await props.searchParams
	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
				<CardTitle className='line-clamp-1 text-xl'>
					Página de transacciones
				</CardTitle>
				<NewTransaction />
			</CardHeader>
			<CardContent>
				<Suspense fallback={<DataTableLoader />}>
					<TransactionsTableWrapper params={params} />
				</Suspense>
			</CardContent>
		</Card>
	)
}
