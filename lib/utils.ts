import { clsx, type ClassValue } from 'clsx'
import { format, subDays } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getAPIUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_API_URL}${path}`
}

export function convertAmountToMiliunits(amount: number) {
	return Math.round(amount * 1000)
}

export function convertAmountFromMiliunits(amount: number) {
	return amount / 1000
}

export default function formatCurrency(amount: number) {
	return Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR'
	}).format(amount)
}

type Period = {
	from: string | Date | undefined
	to: string | Date | undefined
}

export function formatDateRange({ from, to }: Period) {
	const defaultTo = new Date()
	const defaultFrom = subDays(defaultTo, 30)

	if (!from) {
		return `${format(defaultFrom, 'dd/MM/yyyy')} - ${format(defaultTo, 'dd/MM/yyyy')}`
	}
	if (to) {
		return `${format(from, 'dd/MM/yyyy')} - ${format(to, 'dd/MM/yyyy')}`
	}
	return `${format(from, 'dd/MM/yyyy')}`
}

export function formatPercentage(
	value: number,
	options: { addPrefix?: boolean } = {
		addPrefix: false
	}
) {
	const result = new Intl.NumberFormat('es-ES', {
		style: 'percent',
		maximumFractionDigits: 2
	}).format(value / 100)

	if (options.addPrefix && value > 0) {
		return `+${result}`
	}
	return result
}
