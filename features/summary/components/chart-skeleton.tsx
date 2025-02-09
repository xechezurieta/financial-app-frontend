import { Loader2 } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ChartSkeleton() {
	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
				<div className='text-xl line-clamp-1'>Transactions</div>
				<Skeleton className='h-8 lg:w-[120px] w-full' />
			</CardHeader>
			<CardContent>
				<div className='h-[350px] w-full flex items-center justify-center'>
					<Loader2 className='size-6 text-slate-300 animate-spin' />
				</div>
			</CardContent>
		</Card>
	)
}
