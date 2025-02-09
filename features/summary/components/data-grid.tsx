import { FaPiggyBank } from 'react-icons/fa'
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6'

import DataCard from '@/features/summary/components/data-card'
import { getSummary } from '@/features/summary/service'
import { formatDateRange } from '@/lib/utils'

export default async function DataGrid({
	params
}: {
	params: { from?: string; to?: string; accountId?: string }
}) {
	const to = params?.to || undefined
	const from = params?.from || undefined
	const accountId = params?.accountId || undefined
	const data = await getSummary({
		from,
		to,
		accountId: accountId || ''
	})
	console.log('DATAAAA: ', { to, from, accountId })
	const dateRangeLabel = formatDateRange({ from, to })
	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
			<DataCard
				title='Saldo'
				value={data.remainingAmount}
				percentageChange={data.remainingChange}
				icon={FaPiggyBank}
				variant='default'
				dateRange={dateRangeLabel}
			/>
			<DataCard
				title='Ingresos'
				value={data.incomeAmount}
				percentageChange={data.incomeChange}
				icon={FaArrowTrendUp}
				variant='success'
				dateRange={dateRangeLabel}
			/>
			<DataCard
				title='Gastos'
				value={data.expensesAmount}
				percentageChange={data.expensesChange}
				icon={FaArrowTrendDown}
				variant='danger'
				dateRange={dateRangeLabel}
			/>
		</div>
	)
}
