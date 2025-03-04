'use server'

import { getAPIUrl } from '@/lib/utils'

export interface LoginActionState {
	status: 'success' | 'failed' | 'invalid_data'
}

export const getUser = async (email: string, password: string) => {
	const apiUrl = getAPIUrl('/login')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		})
		if (!response.ok) {
			return null
		}
		const data = await response.json()
		return data.user
	} catch (error) {
		console.error(error)
		return null
	}
}
