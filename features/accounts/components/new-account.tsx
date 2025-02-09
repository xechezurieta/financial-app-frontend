'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useNewAccount } from '@/features/accounts/store/use-new-account'

export default function NewAccount() {
	const newAccount = useNewAccount()
	return (
		<Button onClick={newAccount.onOpen} size='sm'>
			<Plus className='size-4 mr-2' />
			Añadir nueva cuenta
		</Button>
	)
}
