import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import EditAccountSheet from '@/features/accounts/components/edit-account-sheet'

// Mock the hooks
const mockOnClose = vi.fn()
const mockIsOpen = true
const mockId = '123'
vi.mock('@/features/accounts/store/use-open-account', () => ({
	useOpenAccount: () => ({
		isOpen: mockIsOpen,
		onClose: mockOnClose,
		id: mockId
	})
}))

const mockHandleEdit = vi.fn()
const mockIsEditingAccount = false
vi.mock('@/features/accounts/hooks/use-edit-account', () => ({
	default: () => ({
		handleEdit: mockHandleEdit,
		isEditingAccount: mockIsEditingAccount
	})
}))

const mockHandleDelete = vi.fn()
const mockIsDeletingAccount = false
vi.mock('@/features/accounts/hooks/use-delete-account', () => ({
	default: () => ({
		handleDelete: mockHandleDelete,
		isDeletingAccount: mockIsDeletingAccount
	})
}))

const mockAccount = { name: 'Test Account' }
const mockIsPending = false
vi.mock('@/features/accounts/hooks/use-get-account', () => ({
	default: () => ({
		data: { account: mockAccount },
		isPending: mockIsPending
	})
}))

const mockConfirm = vi.fn()
vi.mock('@/hooks/use-confirm', () => ({
	useConfirm: () => ({
		confirm: mockConfirm,
		ConfirmDialog: () => <div data-testid='confirm-dialog' />
	})
}))

// Mock the child components
vi.mock('@/components/loading-container', () => ({
	default: () => <div data-testid='loading-container'>Loading...</div>
}))

vi.mock('@/features/accounts/components/account-form', () => ({
	default: ({
		onSubmit,
		disabled,
		defaultValues,
		onDelete
	}: {
		onSubmit: (values: string[] | undefined) => void
		disabled?: boolean
		defaultValues?: string[]
		onDelete?: () => void
	}) => (
		<form
			data-testid='account-form'
			onSubmit={(e) => {
				e.preventDefault()
				onSubmit(defaultValues)
			}}
		>
			<button type='submit' disabled={disabled}>
				Submit
			</button>
			{onDelete && (
				<button type='button' data-testid='delete-button' onClick={onDelete}>
					Delete
				</button>
			)}
		</form>
	)
}))

describe('EditAccountSheet Component', () => {
	afterEach(() => {
		cleanup()
		vi.clearAllMocks()
	})

	it('should render the component correctly when open', () => {
		// Arrange
		render(<EditAccountSheet />)

		// Assert
		expect(screen.getByText('Editar cuenta')).toBeInTheDocument()
		expect(
			screen.getByText('Modifica los datos de tu cuenta.')
		).toBeInTheDocument()
	})

	it('should display the account form with correct default values', () => {
		// Arrange
		render(<EditAccountSheet />)

		// Assert
		expect(screen.getByTestId('account-form')).toBeInTheDocument()
	})
})
