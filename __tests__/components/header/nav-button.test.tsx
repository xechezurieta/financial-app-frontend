import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import NavButton from '@/components/header/nav-button'

describe('NavButton Component', () => {
	afterEach(() => {
		cleanup()
	})

	it('renders with correct label and link', () => {
		render(<NavButton href='/test' label='Test Link' isActive={false} />)
		const button = screen.getByRole('button', { name: 'Test Link' })
		const link = screen.getByRole('link', { name: 'Test Link' })

		expect(button).toBeInTheDocument()
		expect(link).toHaveAttribute('href', '/test')
	})

	it('indicates current page when active', () => {
		render(<NavButton href='/test' label='Test Link' isActive />)
		const button = screen.getByRole('button', { name: 'Test Link' })

		expect(button).toHaveAttribute('aria-current', 'page')
	})

	it('does not indicate current page when inactive', () => {
		render(<NavButton href='/test' label='Test Link' isActive={false} />)
		const button = screen.getByRole('button', { name: 'Test Link' })

		expect(button).not.toHaveAttribute('aria-current')
	})
})
