import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import AccountForm from '@/features/accounts/components/account-form'
import useCreateAccount from '@/features/accounts/hooks/use-create-account'
import { useNewAccount } from '@/features/accounts/store/use-new-account'

export default function NewAccountSheet() {
	const { isOpen, onClose } = useNewAccount()
	const { isCreatingAccount, onSubmit } = useCreateAccount(onClose)
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>Nueva cuenta</SheetTitle>
					<SheetDescription>
						Crea una nueva cuenta para empezar controlar tus transacciones.
					</SheetDescription>
				</SheetHeader>
				<AccountForm
					onSubmit={onSubmit}
					disabled={isCreatingAccount}
					defaultValues={{
						name: ''
					}}
				/>
			</SheetContent>
		</Sheet>
	)
}
