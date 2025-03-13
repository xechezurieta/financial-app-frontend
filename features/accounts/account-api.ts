import { Account } from '@/features/accounts/types'
import { getAPIUrl } from '@/lib/utils'
import { cookies } from 'next/headers'

export const getAccounts = async () => {
	const session = (await cookies()).get('session')?.value
	if (!session) {
		throw new Error('No session')
	}
	try {
		const apiUrl = getAPIUrl('/accounts')
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session}`
			}
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
