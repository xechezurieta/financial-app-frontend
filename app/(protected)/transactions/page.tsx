import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { auth } from '@/app/(auth)/auth'
import DataTableLoader from '@/components/table/data-table-loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NewTransaction from '@/features/transactions/components/new-transaction'
import TransactionsTableWrapper from '@/features/transactions/components/transactions-table-wrapper'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function TransactionsPage(props: {
	searchParams: SearchParams
}) {
	const session = await auth()
	if (!session) return redirect('/login')
	const params = await props.searchParams
	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
				<CardTitle className='text-xl line-clamp-1'>
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
