import { Account } from '@/features/accounts/types'
import { getAPIUrl } from '@/lib/utils'
import { headers } from 'next/headers'

export const getAccounts = async () => {
	const apiUrl = getAPIUrl('/accounts')
	try {
		const response = await fetch(apiUrl, {
			credentials: 'include',
			headers: await headers()
		})
		if (!response.ok) {
			throw new Error('Error getting accounts')
		}
		const data: { accounts: Account[] } = await response.json()
		return data
	} catch (error) {
		console.error(error)
		return { error: 'Error getting accounts' }
	}
}
