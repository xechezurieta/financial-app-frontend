'use server'

import { z } from 'zod'

import { getAPIUrl } from '@/lib/utils'

import { signIn, signOut } from './auth'

const authFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
})

export interface LoginActionState {
	status: 'success' | 'failed' | 'invalid_data'
}

export const login = async ({
	email,
	password
}: {
	email: string
	password: string
}): Promise<LoginActionState> => {
	try {
		const validatedData = authFormSchema.parse({
			email,
			password
		})

		console.log({ validatedData })

		await signIn('credentials', {
			email: validatedData.email,
			password: validatedData.password,
			redirect: false
		})

		return { status: 'success' }
	} catch (error) {
		console.log({ error })
		if (error instanceof z.ZodError) {
			return { status: 'invalid_data' }
		}

		return { status: 'failed' }
	}
}

export const logout = async () => {
	await signOut({
		redirectTo: '/'
	})
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
