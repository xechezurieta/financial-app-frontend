import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import Logo from '@/components/header/logo'

describe('Logo Component', () => {
	afterEach(() => {
		cleanup()
	})

	it('renders logo image and text correctly', () => {
		render(<Logo />)
		const image = screen.getByRole('img', { name: 'Financial logo' })
		const text = screen.getByText('Financial')

		expect(image).toBeInTheDocument()
		expect(text).toBeInTheDocument()
	})

	it('provides navigation to home page', () => {
		render(<Logo />)
		const homeLink = screen.getByRole('link', { name: /go to home page/i })

		expect(homeLink).toHaveAttribute('href', '/')
	})
})
