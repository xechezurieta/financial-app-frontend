import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import NewAccountSheet from '@/features/accounts/components/new-account-sheet'

// Mock the hooks
const mockOnClose = vi.fn()
const mockIsOpen = true
vi.mock('@/features/accounts/store/use-new-account', () => ({
	useNewAccount: () => ({
		isOpen: mockIsOpen,
		onClose: mockOnClose
	})
}))

const mockOnSubmit = vi.fn()
const mockIsCreatingAccount = false
vi.mock('@/features/accounts/hooks/use-create-account', () => ({
	default: () => ({
		isCreatingAccount: mockIsCreatingAccount,
		onSubmit: mockOnSubmit
	})
}))

// Mock the child components to simplify testing
vi.mock('@/features/accounts/components/account-form', () => ({
	default: ({
		onSubmit,
		disabled,
		defaultValues
	}: {
		onSubmit: (values: string[] | undefined) => void
		disabled?: boolean
		defaultValues?: string[]
	}) => (
		<form
			data-testid='account-form'
			onSubmit={(e) => {
				e.preventDefault()
				onSubmit(defaultValues)
			}}
		>
			<button type='submit' disabled={disabled}>
				Submit
			</button>
		</form>
	)
}))

describe('NewAccountSheet Component', () => {
	afterEach(() => {
		cleanup()
		vi.clearAllMocks()
	})

	it('should render the component correctly when open', () => {
		// Arrange
		render(<NewAccountSheet />)

		// Assert
		expect(screen.getByText('Nueva cuenta')).toBeInTheDocument()
		expect(
			screen.getByText(
				'Crea una nueva cuenta para empezar controlar tus transacciones.'
			)
		).toBeInTheDocument()
	})

	it('should display the account form', () => {
		// Arrange
		render(<NewAccountSheet />)

		// Assert
		expect(screen.getByTestId('account-form')).toBeInTheDocument()
	})
})
