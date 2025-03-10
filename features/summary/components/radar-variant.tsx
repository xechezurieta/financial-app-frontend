import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	ResponsiveContainer
} from 'recharts'

type RadarVariantProps = {
	data: { name: string; value: number }[]
}

export default function RadarVariant({ data }: RadarVariantProps) {
	return (
		<ResponsiveContainer width='100%' height={350}>
			<RadarChart cx='50%' cy='50%' outerRadius='60%' data={data}>
				<PolarGrid />
				<PolarAngleAxis dataKey='name' />
				<PolarRadiusAxis />
				<Radar
					dataKey='value'
					stroke='#3b82f6'
					fill='#3b82f6'
					fillOpacity={0.6}
				/>
			</RadarChart>
		</ResponsiveContainer>
	)
}
