import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import DataTableLoader from '@/components/table/data-table-loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AccountsTableWrapper from '@/features/accounts/components/accounts-table-wrapper'
import NewAccount from '@/features/accounts/components/new-account'
import { getSession } from '@/lib/session'

export const dynamic = 'force-dynamic'

export default async function AccountsPage() {
	const session = await getSession()
	console.log('ACCOUNTS PAGE', { session })
	if (!session) {
		redirect('/login')
	}
	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
				<CardTitle className='line-clamp-1 text-xl'>
					Página de cuentas
				</CardTitle>
				<NewAccount />
			</CardHeader>
			<CardContent>
				<Suspense fallback={<DataTableLoader />}>
					<AccountsTableWrapper />
				</Suspense>
			</CardContent>
		</Card>
	)
}
