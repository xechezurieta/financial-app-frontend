'use client'
import { AreaChart, BarChart3, FileSearch, LineChart } from 'lucide-react'
import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { AreaVariant } from '@/features/summary/components/area-variant'
import { BarVariant } from '@/features/summary/components/bar-variant'
import { LineVariant } from '@/features/summary/components/line-variant'

type ChartProps = {
	data?: {
		date: Date
		income: number
		expenses: number
	}[]
}

export default function Chart({ data = [] }: ChartProps) {
	const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('area')
	const handleChartTypeChange = (type: 'line' | 'bar' | 'area') => {
		setChartType(type)
	}
	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0'>
				<CardTitle className='line-clamp-1 text-xl'>Transacciones</CardTitle>
				<Select defaultValue={chartType} onValueChange={handleChartTypeChange}>
					<SelectTrigger className='h-9 rounded-md px-3 lg:w-auto'>
						<SelectValue placeholder='Tipo de gráfico' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='area'>
							<div className='flex items-center'>
								<AreaChart className='mr-2 size-4 shrink-0' />
								<span>Gráfico de área</span>
							</div>
						</SelectItem>
						<SelectItem value='line'>
							<div className='flex items-center'>
								<LineChart className='mr-2 size-4 shrink-0' />
								<span>Gráfico de línea</span>
							</div>
						</SelectItem>
						<SelectItem value='bar'>
							<div className='flex items-center'>
								<BarChart3 className='mr-2 size-4 shrink-0' />
								<span>Gráfico de barra</span>
							</div>
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent>
				{data.length === 0 ? (
					<div className='flex h-[350px] w-full flex-col items-center justify-center gap-y-4'>
						<FileSearch className='size-6 text-muted-foreground' />
						<p className='text-sm text-muted-foreground'>
							No hay información para este periodo
						</p>
					</div>
				) : (
					<>
						{chartType === 'area' && <AreaVariant data={data} />}
						{chartType === 'bar' && <BarVariant data={data} />}
						{chartType === 'line' && <LineVariant data={data} />}
					</>
				)}
			</CardContent>
		</Card>
	)
}
