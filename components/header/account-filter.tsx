'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import useGetAccounts from '@/features/accounts/hooks/use-get-accounts'
import useGetSummary from '@/features/summary/hooks/use-get-summary'

export default function AccountFilter() {
	const { isPending: isLoadingSummary } = useGetSummary()
	const { data, isPending: isLoadingAccounts } = useGetAccounts()
	const router = useRouter()
	const pathname = usePathname()

	const params = useSearchParams()
	const accountId = params.get('accountId') || 'all'
	const from = params.get('from') || ''
	const to = params.get('to') || ''

	const onChange = (newValue: string) => {
		const newParams = new URLSearchParams()
		newParams.set('accountId', newValue === 'all' ? '' : newValue)
		newParams.set('from', from)
		newParams.set('to', to)
		router.push(`${pathname}?${newParams.toString()}`)
	}

	return (
		<Select
			value={accountId}
			onValueChange={onChange}
			disabled={isLoadingSummary || isLoadingAccounts}
		>
			<SelectTrigger className='lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition'>
				<SelectValue placeholder='Selecciona una cuenta'></SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='all'>Todas las cuentas</SelectItem>
				{data?.accounts.map((account) => (
					<SelectItem key={account.id} value={account.id}>
						{account.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
