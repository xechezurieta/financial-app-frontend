/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { columns } from '@/features/accounts/components/colums'
import { Account } from '@/features/accounts/types'

// Mock the Checkbox component to render an actual checkbox input
vi.mock('@/components/ui/checkbox', () => ({
	Checkbox: ({
		checked,
		onCheckedChange,
		'aria-label': ariaLabel
	}: {
		checked?: boolean
		onCheckedChange?: (checked: boolean) => void
		'aria-label'?: string
	}) => (
		<input
			type='checkbox'
			checked={checked === true}
			onChange={(e) => onCheckedChange?.(e.target.checked)}
			aria-label={ariaLabel}
		/>
	)
}))

// Mock the AccountActions component
vi.mock('@/features/accounts/components/account-actions', () => ({
	default: ({ id }: { id: string }) => (
		<div data-testid='account-actions'>{id}</div>
	)
}))

describe('Account Columns Definition', () => {
	it('should have the correct number of columns', () => {
		expect(columns).toHaveLength(3)
	})

	it('should have the expected column identifiers', () => {
		const columnIds = columns.map((column) => column.id)
		expect(columnIds).toContain('select')
		expect(columnIds).toContain('name')
		expect(columnIds).toContain('actions')
	})

	describe('Selection column', () => {
		it('should have correct header checkbox behavior', () => {
			const selectColumn = columns.find((col) => col.id === 'select')
			expect(selectColumn).toBeDefined()

			const mockTable = {
				getIsAllPageRowsSelected: vi.fn().mockReturnValue(true),
				getIsSomePageRowsSelected: vi.fn().mockReturnValue(false),
				toggleAllPageRowsSelected: vi.fn()
			}

			if (selectColumn && selectColumn.header) {
				const { container } = render(
					<>{(selectColumn.header as Function)({ table: mockTable })}</>
				)
				const checkbox = container.querySelector('input[type="checkbox"]')
				expect(checkbox).toBeInTheDocument()
				expect(checkbox).toHaveAttribute('aria-label', 'Select all')
			}
		})

		it('should have correct cell checkbox behavior', () => {
			const selectColumn = columns.find((col) => col.id === 'select')
			expect(selectColumn).toBeDefined()

			const mockRow = {
				getIsSelected: vi.fn().mockReturnValue(false),
				toggleSelected: vi.fn()
			}

			if (selectColumn && selectColumn.cell) {
				const { container } = render(
					<>{(selectColumn.cell as Function)({ row: mockRow })}</>
				)
				const checkbox = container.querySelector('input[type="checkbox"]')
				expect(checkbox).toBeInTheDocument()
				expect(checkbox).toHaveAttribute('aria-label', 'Select row')
			}
		})
	})

	describe('Name column', () => {
		it('should have a sortable header', () => {
			const nameColumn = columns.find((col) => col.id === 'name')
			expect(nameColumn).toBeDefined()

			const mockColumn = {
				getIsSorted: vi.fn().mockReturnValue('asc'),
				toggleSorting: vi.fn()
			}

			if (nameColumn && nameColumn.header) {
				const { getByText } = render(
					<>{(nameColumn.header as Function)({ column: mockColumn })}</>
				)

				expect(getByText('Nombre')).toBeInTheDocument()
				// Verify the ArrowUpDown icon is present
				const buttonElement = screen.getByRole('button')
				expect(buttonElement).toBeInTheDocument()
			}
		})
	})

	describe('Actions column', () => {
		it('should render account actions with the correct ID', () => {
			const actionsColumn = columns.find((col) => col.id === 'actions')
			expect(actionsColumn).toBeDefined()

			const mockAccount: Account = {
				id: 'test-id',
				name: 'Test Account',
				plaidId: 'plaid-id',
				userId: 'user-id'
			}

			if (actionsColumn && actionsColumn.cell) {
				const { getByTestId } = render(
					<>
						{(actionsColumn.cell as Function)({
							row: { original: mockAccount }
						})}
					</>
				)

				const actionsElement = getByTestId('account-actions')
				expect(actionsElement).toBeInTheDocument()
				expect(actionsElement).toHaveTextContent('test-id')
			}
		})
	})
})
