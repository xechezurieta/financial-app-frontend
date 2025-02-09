import { Account } from '@/features/accounts/types'
import { getAPIUrl } from '@/lib/utils'

export const getAccounts = async () => {
	const apiUrl = getAPIUrl('/accounts')
	try {
		const response = await fetch(apiUrl)
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
