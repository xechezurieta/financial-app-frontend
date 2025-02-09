'use client'
import { format, subDays } from 'date-fns'
import { ChevronDown } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import useGetSummary from '@/features/summary/hooks/use-get-summary'
import { cn, formatDateRange } from '@/lib/utils'

export default function DateFilter() {
	const router = useRouter()
	const pathname = usePathname()

	const params = useSearchParams()
	const accountId = params.get('accountId')
	const from = params.get('from') || ''
	const to = params.get('to') || ''

	const defaultTo = new Date()
	const defaultFrom = subDays(defaultTo, 30)

	const paramState = {
		from: from ? new Date(from) : defaultFrom,
		to: to ? new Date(to) : defaultTo
	}

	const [date, setDate] = useState<DateRange | undefined>(paramState)

	const pushToUrl = (date: DateRange | undefined) => {
		const newParams = new URLSearchParams()
		newParams.set('from', format(date?.from || defaultFrom, 'yyyy-MM-dd'))
		newParams.set('to', format(date?.to || defaultTo, 'yyyy-MM-dd'))
		newParams.set('accountId', accountId || '')
		router.push(`${pathname}?${newParams.toString()}`)
	}
	const onReset = () => {
		setDate(undefined)
		pushToUrl(undefined)
	}
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					disabled={false}
					size='sm'
					variant='outline'
					className='lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition'
				>
					<span>{formatDateRange(paramState)}</span>
					<ChevronDown className='ml-2 size-4 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='lg:w-auto w-full p-0' align='start'>
				<Calendar
					disabled={false}
					initialFocus
					mode='range'
					defaultMonth={date?.from}
					selected={date}
					onSelect={setDate}
					numberOfMonths={2}
				/>
				<div className='p-4 w-full flex items-center gap-x-2'>
					<PopoverClose asChild>
						<Button
							onClick={onReset}
							disabled={!date?.from || !date?.to}
							className='w-full'
							variant='outline'
						>
							Resetear
						</Button>
					</PopoverClose>
					<PopoverClose asChild>
						<Button
							onClick={() => pushToUrl(date)}
							disabled={!date?.from || !date?.to}
							className='w-full'
						>
							Aplicar
						</Button>
					</PopoverClose>
				</div>
			</PopoverContent>
		</Popover>
	)
}
