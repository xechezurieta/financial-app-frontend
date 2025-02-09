import { VariantProps, cva } from 'class-variance-authority'
import { IconType } from 'react-icons'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CountUp } from '@/features/summary/components/count-up'
import { cn, formatPercentage } from '@/lib/utils'

const boxVariant = cva('rounded-md p-3', {
	variants: {
		variant: {
			default: 'bg-blue-500/20',
			success: 'bg-emerald-500/20',
			danger: 'bg-rose-500/20',
			warning: 'bg-yellow-500/20'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
})

const iconVariant = cva('size-6', {
	variants: {
		variant: {
			default: 'fill-blue-500',
			success: 'fill-emerald-500',
			danger: 'fill-rose-500',
			warning: 'fill-yellow-500'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
})
type BoxVariants = VariantProps<typeof boxVariant>
type IconVariants = VariantProps<typeof iconVariant>

interface DataCardProps extends BoxVariants, IconVariants {
	icon: IconType
	title: string
	value?: number
	dateRange: string
	percentageChange?: number
}

interface DataCardSkeletonProps extends BoxVariants, IconVariants {
	icon: IconType
	title: string
}

export default function DataCard({
	icon: Icon,
	title,
	value = 0,
	variant,
	dateRange,
	percentageChange = 0
}: DataCardProps) {
	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='flex flex-row items-center justify-between gap-x-4'>
				<div className='space-y-2'>
					<CardTitle className='text-2xl line-clamp-1'>{title}</CardTitle>
					<CardDescription className='line-clamp-1'>
						{dateRange}
					</CardDescription>
				</div>
				<div className={cn(boxVariant({ variant }))}>
					<Icon className={cn(iconVariant({ variant }))} />
				</div>
			</CardHeader>
			<CardContent>
				<CountUp endValue={value} />
				<p
					className={cn(
						'text-muted-foreground text-sm line-clamp-1',
						percentageChange > 0 && 'text-emerald-500',
						percentageChange < 0 && 'text-rose-500'
					)}
				>
					{formatPercentage(percentageChange, {
						addPrefix: true
					})}{' '}
					desde el último periodo
				</p>
			</CardContent>
		</Card>
	)
}

export function DataCardSkeleton({
	icon: Icon,
	title,
	variant
}: DataCardSkeletonProps) {
	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='flex flex-row items-center justify-between gap-x-4'>
				<div className='space-y-2'>
					<CardTitle className='text-2xl line-clamp-1'>{title}</CardTitle>
					<Skeleton className='h-4 w-40' />
				</div>
				<div className={cn(boxVariant({ variant }))}>
					<Icon className={cn(iconVariant({ variant }))} />
				</div>
			</CardHeader>
			<CardContent>
				<Skeleton className='shrink-0 h-10 w-24 mb-2' />
				<Skeleton className='shrink-0 h-4 w-40' />
			</CardContent>
		</Card>
	)
}
