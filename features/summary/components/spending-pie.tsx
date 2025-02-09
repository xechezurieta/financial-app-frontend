'use client'
import { FileSearch, PieChart, Radar, Target } from 'lucide-react'
import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import PieVariant from '@/features/summary/components/pie-variant'
import RadarVariant from '@/features/summary/components/radar-variant'
import RadialVariant from '@/features/summary/components/radial-variant'

type SpendingPieProps = {
	data?: {
		name: string
		value: number
	}[]
}

export default function SpendingPie({ data = [] }: SpendingPieProps) {
	const [chartType, setChartType] = useState<'pie' | 'radar' | 'radial'>('pie')
	const handleChartTypeChange = (type: 'pie' | 'radar' | 'radial') => {
		setChartType(type)
	}
	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
				<CardTitle className='text-xl line-clamp-1'>Categorías</CardTitle>
				<Select defaultValue={chartType} onValueChange={handleChartTypeChange}>
					<SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
						<SelectValue placeholder='Tipo de gráfico' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='pie'>
							<div className='flex items-center'>
								<PieChart className='size-4 mr-2 shrink-0' />
								<span>Gráfico circular</span>
							</div>
						</SelectItem>
						<SelectItem value='radar'>
							<div className='flex items-center'>
								<Radar className='size-4 mr-2 shrink-0' />
								<span>Gráfico de radar</span>
							</div>
						</SelectItem>
						<SelectItem value='radial'>
							<div className='flex items-center'>
								<Target className='size-4 mr-2 shrink-0' />
								<span>Gráfico radial</span>
							</div>
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent>
				{data.length === 0 ? (
					<div className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>
						<FileSearch className='size-6 text-muted-foreground' />
						<p className='text-muted-foreground text-sm'>
							No hay información para este periodo
						</p>
					</div>
				) : (
					<>
						{chartType === 'pie' && <PieVariant data={data} />}
						{chartType === 'radar' && <RadarVariant data={data} />}
						{chartType === 'radial' && <RadialVariant data={data} />}
					</>
				)}
			</CardContent>
		</Card>
	)
}
