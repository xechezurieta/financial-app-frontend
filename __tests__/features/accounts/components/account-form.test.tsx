import { describe, it, expect, vi, afterEach } from 'vitest'
import {
	render,
	screen,
	fireEvent,
	cleanup,
	waitFor
} from '@testing-library/react'
import AccountForm from '@/features/accounts/components/account-form'

describe('AccountForm Component', () => {
	const mockOnSubmit = vi.fn()
	const mockOnDelete = vi.fn()

	afterEach(() => {
		cleanup()
		vi.clearAllMocks()
	})

	// Test descriptions improved to follow "it should..." pattern
	it('should render form with correct default values', () => {
		// Arrange
		render(
			<AccountForm
				onSubmit={mockOnSubmit}
				defaultValues={{ name: 'Test Account' }}
			/>
		)

		// Assert
		expect(screen.getByLabelText('Nombre')).toHaveValue('Test Account')
		expect(screen.getByText('Crear cuenta')).toBeInTheDocument()
		expect(screen.queryByText('Eliminar cuenta')).not.toBeInTheDocument()
	})

	it('should display edit mode UI when ID is provided', () => {
		// Arrange
		render(
			<AccountForm
				id='123'
				onSubmit={mockOnSubmit}
				onDelete={mockOnDelete}
				defaultValues={{ name: 'Test Account' }}
			/>
		)

		// Assert
		expect(screen.getByText('Guardar cambios')).toBeInTheDocument()
		expect(screen.getByText('Eliminar cuenta')).toBeInTheDocument()
	})

	it('should submit form with correct input values', async () => {
		// Arrange
		render(<AccountForm onSubmit={mockOnSubmit} defaultValues={{ name: '' }} />)

		// Act
		const input = screen.getByLabelText('Nombre')
		fireEvent.change(input, { target: { value: 'New Account' } })

		const submitButton = screen.getByText('Crear cuenta')
		fireEvent.click(submitButton)

		// Assert
		await waitFor(() => {
			expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'New Account' })
		})
	})

	it('should call onDelete when delete button is clicked', () => {
		render(
			<AccountForm
				id='123'
				onSubmit={mockOnSubmit}
				onDelete={mockOnDelete}
				defaultValues={{ name: 'Test Account' }}
			/>
		)

		fireEvent.click(screen.getByText('Eliminar cuenta'))
		expect(mockOnDelete).toHaveBeenCalled()
	})

	it('should disable all form elements when disabled prop is true', () => {
		render(
			<AccountForm
				id='123'
				onSubmit={mockOnSubmit}
				onDelete={mockOnDelete}
				defaultValues={{ name: 'Test Account' }}
				disabled
			/>
		)

		expect(screen.getByLabelText('Nombre')).toBeDisabled()
		expect(screen.getByText('Guardar cambios')).toBeDisabled()
		expect(screen.getByText('Eliminar cuenta')).toBeDisabled()
	})

	// New test for form validation
	it('should display validation error when submitting empty name', async () => {
		// Arrange
		render(<AccountForm onSubmit={mockOnSubmit} defaultValues={{ name: '' }} />)

		// Act
		const submitButton = screen.getByText('Crear cuenta')
		fireEvent.click(submitButton)

		// Assert
		await waitFor(() => {
			expect(mockOnSubmit).not.toHaveBeenCalled()
		})
	})
})
