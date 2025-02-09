'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useNewTransaction } from '@/features/transactions/stores/use-new-transaction'

export default function NewTransaction() {
	const newTransaction = useNewTransaction()
	return (
		<Button onClick={newTransaction.onOpen} size='sm'>
			<Plus className='size-4 mr-2' />
			Añadir nueva transacción
		</Button>
	)
}
