'use server'

import { getAPIUrl } from '@/lib/utils'
import { PublicUserInfo } from '@/types/types'
import { cookies } from 'next/headers'

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

export const login = async ({
	email,
	password
}: {
	email: string
	password: string
}) => {
	const apiUrl = getAPIUrl('/users/login')
	console.log({ email, password, apiUrl })
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password }),
			credentials: 'include'
		})
		console.log(response)
		if (!response.ok) {
			throw new Error('Error logging in')
		}
		const data: {
			user: PublicUserInfo
			token: string
		} = await response.json()
		// Manually set the cookie in Next.js
		if (data && data.token) {
			const cookieStore = await cookies()
			cookieStore.set('session', data.token)
		}

		return data
	} catch (error) {
		return { error: 'Error logging in' }
	}
}

export const logout = async () => {
	try {
		const cookieStore = await cookies()
		cookieStore.delete('session')

		return { status: 'success' }
	} catch (error) {
		return { status: 'failed' }
	}
}
