import { getAPIUrl } from '@/lib/utils'
import { headers } from 'next/headers'

export const getSession = async () => {
	const apiUrl = getAPIUrl('/authentication/me')

	try {
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: await headers()
		})
		if (!response.ok) {
			throw new Error('Error getting session better auth')
		}
		return response.json()
	} catch (error) {
		console.error(error)
		return { error: 'Error getting session' }
	}
}
