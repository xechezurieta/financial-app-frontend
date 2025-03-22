import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import LoadingContainer from '@/components/loading-container'

describe('LoadingContainer Component', () => {
	afterEach(() => {
		cleanup()
	})

	it('renders without crashing', () => {
		render(<LoadingContainer />)
		const container = screen.getByTestId('loading-container')
		expect(container).toBeInTheDocument()
	})

	it('renders with correct styling classes', () => {
		render(<LoadingContainer />)
		const container = screen.getByTestId('loading-container')
		expect(container).toHaveClass(
			'flex',
			'justify-center',
			'items-center',
			'absolute',
			'inset-0'
		)
	})

	it('renders loading spinner with correct attributes', () => {
		render(<LoadingContainer />)
		const spinner = screen.getByTestId('loading-spinner')
		expect(spinner).toHaveClass(
			'size-4',
			'text-muted-foreground',
			'animate-spin'
		)
	})
})
