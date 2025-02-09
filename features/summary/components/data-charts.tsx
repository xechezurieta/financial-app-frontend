import Chart from '@/features/summary/components/chart'
import SpendingPie from '@/features/summary/components/spending-pie'
import { getSummary } from '@/features/summary/service'

export default async function DataCharts({
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
	return (
		<div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
			<div className='col-span-1 lg:col-span-3 xl:col-span-4'>
				<Chart data={data.days} />
			</div>
			<div className='col-span-1 lg:col-span-3 xl:col-span-2'>
				<SpendingPie data={data.categories} />
			</div>
		</div>
	)
}
