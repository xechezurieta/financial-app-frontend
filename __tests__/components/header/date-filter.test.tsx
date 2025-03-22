import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import DateFilter from '@/components/header/date-filter'
import { format, subDays } from 'date-fns'

// Mock next/navigation
const pushMock = vi.fn()
vi.mock('next/navigation', () => ({
	useRouter: vi.fn(() => ({
		push: pushMock
	})),
	usePathname: vi.fn(() => '/dashboard'),
	useSearchParams: vi.fn(() => ({
		get: vi.fn(() => null)
	}))
}))

describe('DateFilter Component', () => {
	beforeEach(() => {
		// Mock current date to 2024-02-15
		vi.setSystemTime(new Date(2024, 1, 15))
	})

	afterEach(() => {
		cleanup()
		vi.clearAllMocks()
		vi.useRealTimers()
	})

	it('renders with default date range (today and 30 days ago)', () => {
		render(<DateFilter />)
		const button = screen.getByRole('button')

		const today = new Date(2024, 1, 15)
		const thirtyDaysAgo = subDays(today, 30)
		const expectedText = `${format(thirtyDaysAgo, 'dd/MM/yyyy')} - ${format(today, 'dd/MM/yyyy')}`

		expect(button).toBeInTheDocument()
		expect(button).toHaveTextContent(expectedText)
	})

	it('opens calendar popover when clicked', () => {
		render(<DateFilter />)
		const button = screen.getByRole('button')
		fireEvent.click(button)

		// Calendar should be visible
		expect(screen.getByRole('dialog')).toBeInTheDocument()
		expect(screen.getByText('Resetear')).toBeInTheDocument()
		expect(screen.getByText('Aplicar')).toBeInTheDocument()
	})

	it('updates URL when applying new date range', () => {
		render(<DateFilter />)
		const button = screen.getByRole('button')
		fireEvent.click(button)

		// Click Apply button
		const applyButton = screen.getByText('Aplicar')
		fireEvent.click(applyButton)

		expect(pushMock).toHaveBeenCalled()
	})

	it('resets date range when clicking reset', () => {
		render(<DateFilter />)
		const button = screen.getByRole('button')
		fireEvent.click(button)

		// Click Reset button
		const resetButton = screen.getByText('Resetear')
		fireEvent.click(resetButton)

		expect(pushMock).toHaveBeenCalled()
	})
})
