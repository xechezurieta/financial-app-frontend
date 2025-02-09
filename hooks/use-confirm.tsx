import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'

export function useConfirm({
	title,
	description
}: {
	title: string
	description: string
}) {
	const [promise, setPromise] = useState<{
		resolve: (value: boolean) => void
	} | null>(null)

	const confirm = () =>
		new Promise<boolean>((resolve) => {
			setPromise({ resolve })
		})

	const handleClose = () => {
		setPromise(null)
	}

	const handleConfirm = () => {
		promise?.resolve(true)
		handleClose()
	}

	const handleCancel = () => {
		promise?.resolve(false)
		handleClose()
	}

	//TODO: fix close button
	const ConfirmDialog = () => (
		<Dialog open={promise !== null}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				<DialogDescription>{description}</DialogDescription>

				<DialogFooter className='pt-2'>
					<Button variant='outline' onClick={handleCancel}>
						Cancelar
					</Button>
					<Button onClick={handleConfirm}>Confirmar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)

	return { confirm, ConfirmDialog }
}
