import { Edit, MoreHorizontal, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useDeleteAccount from '@/features/accounts/hooks/use-delete-account'
import { useOpenAccount } from '@/features/accounts/store/use-open-account'
import { useConfirm } from '@/hooks/use-confirm'

export default function AccountActions({ id }: { id: string }) {
	const { ConfirmDialog, confirm } = useConfirm({
		title: 'Eliminar cuenta',
		description: '¿Estás seguro de que quieres eliminar esta cuenta?'
	})
	const { onOpen } = useOpenAccount()
	const { isDeletingAccount, handleDelete } = useDeleteAccount()

	const onDelete = async () => {
		if (!id) return
		const confirmed = await confirm()
		if (!confirmed) return
		handleDelete({ id })
	}

	return (
		<>
			<ConfirmDialog />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='size-8 p-0'>
						<MoreHorizontal className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						disabled={isDeletingAccount}
						onClick={() => onOpen(id)}
					>
						<Edit className='mr-2 size-4' />
						Editar
					</DropdownMenuItem>

					<DropdownMenuItem disabled={isDeletingAccount} onClick={onDelete}>
						<Trash className='mr-2 size-4' />
						Eliminar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
