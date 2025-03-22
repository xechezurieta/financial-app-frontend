import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { DataTable } from '@/components/table/data-table'

// Mock data
const mockData = [
	{ id: 1, name: 'Test 1' },
	{ id: 2, name: 'Test 2' }
]

const mockColumns = [
	{
		id: 'select',
		header: 'Select'
	},
	{
		accessorKey: 'name',
		header: 'Name'
	}
]

const mockOnDelete = vi.fn()

describe('DataTable Component', () => {
	afterEach(() => {
		cleanup()
		vi.clearAllMocks()
	})

	it('renders table with data correctly', () => {
		render(
			<DataTable
				columns={mockColumns}
				data={mockData}
				filterKey='name'
				onDelete={mockOnDelete}
			/>
		)

		expect(screen.getByRole('table')).toBeInTheDocument()
		expect(screen.getByPlaceholderText(/Filtrar por name/i)).toBeInTheDocument()
	})

	it('shows no results message when data is empty', () => {
		render(
			<DataTable
				columns={mockColumns}
				data={[]}
				filterKey='name'
				onDelete={mockOnDelete}
			/>
		)

		expect(screen.getByText('No results.')).toBeInTheDocument()
	})

	it('handles filtering correctly', () => {
		render(
			<DataTable
				columns={mockColumns}
				data={mockData}
				filterKey='name'
				onDelete={mockOnDelete}
			/>
		)

		const filterInput = screen.getByPlaceholderText(/Filtrar por name/i)
		fireEvent.change(filterInput, { target: { value: 'Test 1' } })

		expect(filterInput).toHaveValue('Test 1')
	})

	it('shows correct selection count', async () => {
		render(
			<DataTable
				columns={mockColumns}
				data={mockData}
				filterKey='name'
				onDelete={mockOnDelete}
			/>
		)

		expect(
			screen.getByText('0 de 2 fila(s) seleccionada(s).')
		).toBeInTheDocument()
	})
})
