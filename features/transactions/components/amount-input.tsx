import { Info, MinusCircle, PlusCircle } from 'lucide-react'
import CurrencyInput from 'react-currency-input-field'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type AmountInputProps = {
	value: string
	onChange: (value: string | undefined) => void
	placeholder?: string
	disabled?: boolean
}

export default function AmountInput({
	value,
	onChange,
	placeholder,
	disabled
}: AmountInputProps) {
	const parsedValue = parseFloat(value)
	const isIncome = parsedValue > 0
	const isExpense = parsedValue < 0

	const onReverseValue = () => {
		if (!value) return
		const newValue = parseFloat(value) * -1
		onChange(newValue.toString())
	}
	return (
		<div className='relative'>
			<TooltipProvider>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<button
							type='button'
							onClick={onReverseValue}
							className={cn(
								'bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition',
								isIncome && 'text-emerald-500 hover:bg-emerald-600',
								isExpense && 'text-rose-500 hover:bg-rose-600'
							)}
						>
							{!parsedValue && <Info className='size-3 text-white' />}
							{isIncome && <PlusCircle className='size-3 text-green-500' />}
							{isExpense && <MinusCircle className='size-3 text-red-500' />}
						</button>
					</TooltipTrigger>
					<TooltipContent>
						Usa [+] para ingresos y [-] para gastos
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<CurrencyInput
				suffix='€'
				className='flex h-10 w-full rounded-md border border-input bg-background  px-10 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
				placeholder={placeholder}
				value={value}
				onValueChange={onChange}
				disabled={disabled}
				decimalsLimit={2}
				decimalScale={2}
			/>
			<p className='text-xs text-muted-foreground mt-2'>
				{isIncome && 'Esto es un ingreso'}
				{isExpense && 'Esto es un gasto'}
			</p>
		</div>
	)
}
