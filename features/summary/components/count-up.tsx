'use client'
import { useCountUp } from '@/features/summary/hooks/use-count-up'
import formatCurrency from '@/lib/utils'

interface CountUpProps {
	endValue: number
	duration?: number
}

export function CountUp({ endValue, duration = 1500 }: CountUpProps) {
	const count = useCountUp(endValue, duration)

	const formattedCount = formatCurrency(count)

	return (
		<h1 className='font-bold text-2xl mb-2 line-clamp-1 break-all'>
			{formattedCount}
		</h1>
	)
}
