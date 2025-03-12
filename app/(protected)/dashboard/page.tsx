/* 'use client' */

import { Suspense } from 'react'

import DataCharts from '@/features/summary/components/data-charts'
import DataChartsSkeleton from '@/features/summary/components/data-charts-skeleton'
import DataGrid from '@/features/summary/components/data-grid'
import DataGridSkeleton from '@/features/summary/components/data-grid-skeleton'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function Dashboard(props: { searchParams: SearchParams }) {
	const session = await getSession()
	if (!session) {
		redirect('/login')
	}
	const params = await props.searchParams

	return (
		<>
			<Suspense fallback={<DataGridSkeleton />}>
				<DataGrid key={params.toString()} params={params} />
			</Suspense>
			<Suspense fallback={<DataChartsSkeleton />}>
				<DataCharts key={params.toString()} params={params} />
			</Suspense>
		</>
	)
}
