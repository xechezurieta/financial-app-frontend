'use client'

import { useEffect, useState } from 'react'

import EditAccountSheet from '@/features/accounts/components/edit-account-sheet'
import NewAccountSheet from '@/features/accounts/components/new-account-sheet'
import EditCategorySheet from '@/features/categories/components/edit-category-sheet'
import NewCategorySheet from '@/features/categories/components/new-category-sheet'
import EditTransactionSheet from '@/features/transactions/components/edit-transaction-sheet'
import NewTransactionSheet from '@/features/transactions/components/new-transaction-sheet'

export default function SheetProvider() {
	const [isMounted, setIsMounted] = useState(false)
	useEffect(() => {
		setIsMounted(true)
	}, [])
	if (!isMounted) return null
	return (
		<>
			<EditAccountSheet />
			<NewAccountSheet />

			<EditCategorySheet />
			<NewCategorySheet />

			<EditTransactionSheet />
			<NewTransactionSheet />
		</>
	)
}
