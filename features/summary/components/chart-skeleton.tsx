import { Loader2 } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ChartSkeleton() {
	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0'>
				<div className='line-clamp-1 text-xl'>Transacciones</div>
				<Skeleton className='h-8 w-full lg:w-[120px]' />
			</CardHeader>
			<CardContent>
				<div className='flex h-[350px] w-full items-center justify-center'>
					<Loader2 className='size-6 animate-spin text-slate-300' />
				</div>
			</CardContent>
		</Card>
	)
}
