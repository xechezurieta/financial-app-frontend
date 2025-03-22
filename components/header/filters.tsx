import { Suspense } from 'react'

import AccountFilter from '@/components/header/account-filter'
import DateFilter from '@/components/header/date-filter'

export default function Filters() {
	return (
		<div
			role='complementary'
			className='flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-2 lg:gap-y-0'
		>
			<Suspense>
				<AccountFilter />
			</Suspense>
			<Suspense>
				<DateFilter />
			</Suspense>
		</div>
	)
}
