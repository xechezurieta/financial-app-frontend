import { FaPiggyBank } from 'react-icons/fa'
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6'

import { DataCardSkeleton } from '@/features/summary/components/data-card'

export default function DataGridSkeleton() {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
			<DataCardSkeleton title='Saldo' icon={FaPiggyBank} variant='default' />
			<DataCardSkeleton
				title='Ingresos'
				icon={FaArrowTrendUp}
				variant='success'
			/>
			<DataCardSkeleton
				title='Gastos'
				icon={FaArrowTrendDown}
				variant='danger'
			/>
		</div>
	)
}
