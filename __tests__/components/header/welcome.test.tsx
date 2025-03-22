import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import Welcome from '@/components/header/welcome'

describe('Welcome Component', () => {
	// Clean up after each test to prevent duplicate elements
	afterEach(() => {
		cleanup()
	})

	it('renders welcome heading correctly', () => {
		render(<Welcome />)

		const heading = screen.getByRole('heading', { name: /¡Bienvenido!/i })
		expect(heading).toBeInTheDocument()
		expect(heading).toHaveTextContent(/¡Bienvenido!/i)
	})

	it('renders the financial report message correctly', () => {
		render(<Welcome />)

		const message = screen.getByText(/Este es tu informe general financiero/i)
		expect(message).toBeInTheDocument()
		expect(message).toHaveTextContent(/Este es tu informe general financiero/i)
	})

	it('renders the component with proper structure', () => {
		const { container } = render(<Welcome />)

		// Check that container has content
		expect(container.firstChild).not.toBeNull()

		// Check structure using DOM assertions
		const welcomeContainer = container.firstChild as HTMLElement
		expect(welcomeContainer.children).toHaveLength(2) // header and paragraph
	})
})
