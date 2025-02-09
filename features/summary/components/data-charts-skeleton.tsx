import ChartSkeleton from '@/features/summary/components/chart-skeleton'
import SpendingPieSkeleton from '@/features/summary/components/spending-pie-skeleton'

export default function DataChartsSkeleton() {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
			<div className='col-span-1 lg:col-span-3 xl:col-span-4'>
				<ChartSkeleton />
			</div>
			<div className='col-span-1 lg:col-span-3 xl:col-span-2'>
				<SpendingPieSkeleton />
			</div>
		</div>
	)
}
