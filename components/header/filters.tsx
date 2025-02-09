import { Suspense } from 'react'

import AccountFilter from '@/components/header/account-filter'
import DateFilter from '@/components/header/date-filter'

export default function Filters() {
	return (
		<div className='flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2'>
			<Suspense>
				<AccountFilter />
			</Suspense>
			<Suspense>
				<DateFilter />
			</Suspense>
		</div>
	)
}
