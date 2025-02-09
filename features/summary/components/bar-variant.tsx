'use client'
import { format } from 'date-fns'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis
} from 'recharts'

import { ChartCustomTooltip } from '@/features/summary/components/chart-custom-tooltip'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))'
	},
	mobile: {
		label: 'Mobile',
		color: 'hsl(var(--chart-2))'
	}
} satisfies ChartConfig

export function BarVariant({
	data
}: {
	data: { date: Date; income: number; expenses: number }[]
}) {
	return (
		<ResponsiveContainer width='100%' height={350}>
			<ChartContainer config={chartConfig}>
				<BarChart accessibilityLayer data={data}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis
						dataKey='date'
						tickLine={false}
						axisLine={false}
						tickMargin={16}
						tickFormatter={(value) => format(value, 'MMM dd')}
					/>
					<Tooltip cursor={false} content={<ChartCustomTooltip />} />
					<Bar dataKey='income' fill='#3b82f6' className='drop-shadow-sm' />
					<Bar dataKey='expenses' fill='#f43f5e' className='drop-shadow-sm' />
				</BarChart>
			</ChartContainer>
		</ResponsiveContainer>
	)
}
