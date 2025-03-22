import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import Navigation from '@/components/header/navigation'

// Mock the necessary hooks
vi.mock('next/navigation', () => ({
	usePathname: vi.fn(() => '/dashboard'),
	useRouter: vi.fn(() => ({
		push: vi.fn()
	}))
}))

// Mock the react-use hook
vi.mock('react-use', () => ({
	useMedia: vi.fn()
}))

describe('Navigation Component', () => {
	// Clean up after each test to prevent duplicate elements
	afterEach(() => {
		cleanup()
		vi.resetAllMocks()
	})

	it('renders desktop navigation with all routes', async () => {
		// Mock useMedia to return desktop view
		const { useMedia } = vi.mocked(await import('react-use'))
		useMedia.mockReturnValue(false) // not mobile

		render(<Navigation />)

		// Check that all route labels are rendered
		expect(screen.getByText('Vista general')).toBeInTheDocument()
		expect(screen.getByText('Transacciones')).toBeInTheDocument()
		expect(screen.getByText('Cuentas')).toBeInTheDocument()
		expect(screen.getByText('Categorias')).toBeInTheDocument()
	})

	it('renders mobile navigation with menu button', async () => {
		// Mock useMedia to return mobile view
		const { useMedia } = vi.mocked(await import('react-use'))
		useMedia.mockReturnValue(true) // is mobile

		render(<Navigation />)

		// Should find the menu button in mobile view
		const menuButton = screen.getByRole('button')
		expect(menuButton).toBeInTheDocument()

		// Navigation links should not be directly visible in the document
		expect(screen.queryByText('Vista general')).not.toBeInTheDocument()
		expect(screen.queryByText('Transacciones')).not.toBeInTheDocument()
		expect(screen.queryByText('Cuentas')).not.toBeInTheDocument()
		expect(screen.queryByText('Categorias')).not.toBeInTheDocument()
	})

	it('shows navigation links when menu is clicked in mobile view', async () => {
		// Mock useMedia to return mobile view
		const { useMedia } = vi.mocked(await import('react-use'))
		useMedia.mockReturnValue(true)

		render(<Navigation />)

		// Click the menu button
		const menuButton = screen.getByRole('button')
		fireEvent.click(menuButton)

		// Now the navigation links should be visible in the sheet
		expect(await screen.findByText('Vista general')).toBeInTheDocument()
		expect(await screen.findByText('Transacciones')).toBeInTheDocument()
		expect(await screen.findByText('Cuentas')).toBeInTheDocument()
		expect(await screen.findByText('Categorias')).toBeInTheDocument()
	})

	it('highlights the active route correctly', async () => {
		// Mock useMedia to return desktop view
		const { useMedia } = vi.mocked(await import('react-use'))
		useMedia.mockReturnValue(false) // not mobile

		// Mock the pathname to be /dashboard
		const { usePathname } = vi.mocked(await import('next/navigation'))
		usePathname.mockReturnValue('/dashboard')

		render(<Navigation />)

		// Check that navigation buttons are rendered
		const navButtons = screen.getAllByRole('button')
		expect(navButtons.length).toBeGreaterThan(0)

		// Dashboard should be active
		const dashboardButton = screen.getByText('Vista general').closest('button')
		expect(dashboardButton).toHaveClass('bg-white/10')
	})
})
