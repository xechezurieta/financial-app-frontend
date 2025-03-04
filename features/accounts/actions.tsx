'use server'
import { revalidatePath } from 'next/cache'

import { getAccounts as getAccountsService } from '@/features/accounts/account-api'
import { Account } from '@/features/accounts/types'
import { getAPIUrl } from '@/lib/utils'
import { getSession } from '@/features/auth/service'
import { headers } from 'next/headers'

// TODO: Implement better auth management
export const createAccount = async (name: string) => {
	const session = await getSession()
	console.log('createAccount: ', { session })
	const headersNext = await headers()
	console.log('createAccount: ', { headersNext: JSON.stringify(headersNext) })
	if (!session) return
	const apiUrl = getAPIUrl('/accounts')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id,
				name
			}),
			credentials: 'include'
		})
		console.log('createAccount: ', { response })
		if (!response.ok) {
			return { error: 'Error creating account' }
		}
		const data: { account: Account } = await response.json()
		revalidatePath('/accounts')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error creating account' }
	}
}

export const deleteAccounts = async (accountIds: Array<string>) => {
	const session = await getSession()
	if (!session) throw new Error('No session')

	const apiUrl = getAPIUrl('/accounts')
	try {
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id,
				accountIds
			}),
			credentials: 'include'
		})
		if (!response.ok) {
			throw new Error('Error deleting accounts')
		}
		const data: { deletedAccounts: Array<string> } = await response.json()
		revalidatePath('/accounts')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting accounts' }
	}
}

export const getAccount = async (accountId: string) => {
	const session = await getSession()
	if (!session) return
	const apiUrl = getAPIUrl(`/accounts/${accountId}`)
	try {
		const response = await fetch(apiUrl, {
			method: 'GET',
			credentials: 'include'
		})
		if (!response.ok) {
			return { error: 'Error getting account' }
		}
		const data: { account: Account } = await response.json()
		return data
	} catch (error) {
		return { error: 'Error getting account' }
	}
}

export const editAccountName = async ({
	name,
	accountId
}: {
	name: string
	accountId: string
}) => {
	const session = await getSession()
	if (!session) return
	const apiUrl = getAPIUrl(`/accounts/${accountId}`)
	try {
		const response = await fetch(apiUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id,
				name
			}),
			credentials: 'include'
		})
		if (!response.ok) {
			return { error: 'Error creating account' }
		}
		const data: { account: Account } = await response.json()
		revalidatePath('/accounts')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error creating account' }
	}
}

export const deleteAccount = async (accountId: string) => {
	const session = await getSession()
	if (!session) return
	const apiUrl = getAPIUrl(`/accounts/${accountId}`)
	try {
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id
			}),
			credentials: 'include'
		})
		if (!response.ok) {
			return { error: 'Error deleting account' }
		}
		const data: { account: Account } = await response.json()
		revalidatePath('/accounts')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting account' }
	}
}

export const getAccountsAction = async () => {
	const session = await getSession()
	if (!session) throw new Error('No session')

	try {
		const accounts = await getAccountsService()
		if (!accounts) {
			throw new Error('Error getting accounts')
		}
		return accounts
	} catch (error) {
		return { error: 'Error getting accounts' }
	}
}

export const getAccounts = async () => {
	const apiUrl = getAPIUrl('/accounts')
	try {
		const response = await fetch(apiUrl)
		console.log('GETACCOUNTS: ', { response })
		if (!response.ok) {
			throw new Error('Failed to fetch accounts')
		}
		const data: { accounts: Account[] } = await response.json()
		return data
	} catch (error) {
		console.error(error)
		throw new Error('Failed to fetch accounts')
	}
}
