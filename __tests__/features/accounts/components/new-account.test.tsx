import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import NewAccount from '@/features/accounts/components/new-account'

// Mock the useNewAccount hook
const mockOnOpen = vi.fn()
vi.mock('@/features/accounts/store/use-new-account', () => ({
	useNewAccount: () => ({
		onOpen: mockOnOpen
	})
}))

describe('NewAccount Component', () => {
	afterEach(() => {
		cleanup()
		vi.clearAllMocks()
	})

	it('should render the component correctly', () => {
		// Arrange
		render(<NewAccount />)

		// Assert
		expect(screen.getByRole('button')).toBeInTheDocument()
		expect(screen.getByText('Añadir nueva cuenta')).toBeInTheDocument()
	})

	it('should display the Plus icon', () => {
		// Arrange
		render(<NewAccount />)

		// Assert
		// Just verify the icon is present without checking styles
		const iconElement = document.querySelector('svg')
		expect(iconElement).toBeInTheDocument()
	})

	it('should call onOpen when the button is clicked', () => {
		// Arrange
		render(<NewAccount />)

		// Act
		fireEvent.click(screen.getByRole('button'))

		// Assert
		expect(mockOnOpen).toHaveBeenCalledTimes(1)
	})
})
