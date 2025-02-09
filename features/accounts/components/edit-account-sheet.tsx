import LoadingContainer from '@/components/loading-container'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import AccountForm from '@/features/accounts/components/account-form'
import useDeleteAccount from '@/features/accounts/hooks/use-delete-account'
import useEditAccount from '@/features/accounts/hooks/use-edit-account'
import useGetAccount from '@/features/accounts/hooks/use-get-account'
import { useOpenAccount } from '@/features/accounts/store/use-open-account'
import { useConfirm } from '@/hooks/use-confirm'

export default function EditAccountSheet() {
	const { confirm, ConfirmDialog } = useConfirm({
		title: 'Eliminar cuenta',
		description: '¿Estás seguro de que quieres eliminar esta cuenta?'
	})
	const { isOpen, onClose, id } = useOpenAccount()
	const { handleEdit, isEditingAccount } = useEditAccount()
	const { handleDelete, isDeletingAccount } = useDeleteAccount()
	const { data, isPending } = useGetAccount({ id })
	const account = data && 'account' in data ? data.account : null

	const onSubmit = ({ name }: { name: string }) => {
		if (!id) return
		handleEdit({ name, id, onClose })
	}

	const onDelete = async () => {
		if (!id) return
		const confirmed = await confirm()
		if (!confirmed) return
		handleDelete({ id, onClose })
	}

	return (
		<>
			<ConfirmDialog />
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent className='space-y-4'>
					<SheetHeader>
						<SheetTitle>Editar cuenta</SheetTitle>
						<SheetDescription>
							Modifica los datos de tu cuenta.
						</SheetDescription>
					</SheetHeader>
					{isPending ? (
						<LoadingContainer />
					) : (
						<AccountForm
							id={id}
							onSubmit={onSubmit}
							disabled={isEditingAccount || isPending || isDeletingAccount}
							defaultValues={{
								name: account?.name || ''
							}}
							onDelete={onDelete}
						/>
					)}
				</SheetContent>
			</Sheet>
		</>
	)
}
