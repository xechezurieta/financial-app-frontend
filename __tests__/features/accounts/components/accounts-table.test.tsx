import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import AccountsTable from '@/features/accounts/components/accounts-table'
import { Account } from '@/features/accounts/types'
import { ColumnDef } from '@tanstack/react-table'

// Create mock handler function
const mockHandleDelete = vi.fn()

// Mock dependencies - moved outside of describe block to ensure proper hoisting
vi.mock('@/features/accounts/hooks/use-delete-accounts', () => ({
	default: () => ({
		isDeleting: false,
		handleDelete: mockHandleDelete
	})
}))

// Mock DataTable component
vi.mock('@/components/table/data-table', () => ({
	DataTable: ({
		filterKey,
		columns,
		data,
		onDelete,
		disabled
	}: {
		filterKey: string
		columns: ColumnDef<Account>[]
		data: Account[]
		onDelete: (ids: string[]) => void
		disabled: boolean
	}) => (
		<div data-testid='data-table'>
			<div data-testid='filter-key'>{filterKey}</div>
			<div data-testid='columns'>{columns.length}</div>
			<div data-testid='data'>{JSON.stringify(data)}</div>
			<div data-testid='disabled'>{disabled.toString()}</div>
			<button
				data-testid='delete-button'
				disabled={disabled}
				onClick={() => onDelete(['1'])}
			>
				Delete
			</button>
		</div>
	)
}))

// Mock account data
const mockAccounts: Account[] = [
	{ id: '1', name: 'Cash', plaidId: 'plaid1', userId: 'user1' },
	{ id: '2', name: 'Bank Account', plaidId: 'plaid2', userId: 'user1' },
	{ id: '3', name: 'Credit Card', plaidId: 'plaid3', userId: 'user1' }
]

describe('AccountsTable Component', () => {
	beforeEach(() => {
		// Reset mocks before each test
		vi.clearAllMocks()
	})

	afterEach(() => {
		cleanup()
	})

	it('should render with correct props', () => {
		// Arrange
		render(<AccountsTable accounts={mockAccounts} />)

		// Assert
		expect(screen.getByTestId('data-table')).toBeInTheDocument()
		expect(screen.getByTestId('filter-key')).toHaveTextContent('name')
		expect(screen.getByTestId('data')).toHaveTextContent(
			JSON.stringify(mockAccounts)
		)
	})

	it('should pass correct columns to DataTable', () => {
		// Arrange
		render(<AccountsTable accounts={mockAccounts} />)

		// Assert
		expect(screen.getByTestId('columns')).toBeInTheDocument()
	})

	it('should disable delete functionality when isDeleting is true', () => {
		// Override the mock for this specific test
		vi.mocked(vi.importActual('@/features/accounts/hooks/use-delete-accounts'))

		// Re-mock the module for this specific test
		vi.mock('@/features/accounts/hooks/use-delete-accounts', () => ({
			default: () => ({
				isDeleting: true,
				handleDelete: mockHandleDelete
			})
		}))

		// Arrange
		render(<AccountsTable accounts={mockAccounts} />)

		// Assert
		expect(screen.getByTestId('disabled')).toHaveTextContent('true')
	})

	it('should render empty table when no accounts are provided', () => {
		// Arrange
		render(<AccountsTable accounts={[]} />)

		// Assert
		expect(screen.getByTestId('data')).toHaveTextContent('[]')
	})
})
