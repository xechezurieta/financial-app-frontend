import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import DataTableLoader from '@/components/table/data-table-loader'

describe('DataTableLoader Component', () => {
	afterEach(() => {
		cleanup()
	})

	it('renders loader component with correct accessibility role', () => {
		render(<DataTableLoader />)
		const loaderElement = screen.getByRole('status')
		expect(loaderElement).toBeInTheDocument()
		expect(loaderElement).toHaveAttribute('aria-busy', 'true')
	})

	it('indicates loading state to users', () => {
		render(<DataTableLoader />)
		const loadingText = screen.getByText(/loading/i)
		expect(loadingText).toBeInTheDocument()
		expect(loadingText).toHaveClass('sr-only')
	})
})
