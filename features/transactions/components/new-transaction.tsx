'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useNewTransaction } from '@/features/transactions/stores/use-new-transaction'

export default function NewTransaction() {
	const newTransaction = useNewTransaction()
	return (
		<Button onClick={newTransaction.onOpen} size='sm'>
			<Plus className='mr-2 size-4' />
			Añadir nueva transacción
		</Button>
	)
}
