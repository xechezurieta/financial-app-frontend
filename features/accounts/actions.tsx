'use server'
import { revalidatePath } from 'next/cache'
import { getAccounts as getAccountsService } from '@/features/accounts/account-api'
import { Account } from '@/features/accounts/types'
import { getAPIUrl } from '@/lib/utils'
import { cookies } from 'next/headers'

export const createAccount = async (name: string) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl('/accounts')
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			},
			body: JSON.stringify({
				name
			})
		})
		if (!response.ok) return { error: 'Error creating account' }

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
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl('/accounts')
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			},
			body: JSON.stringify({
				accountIds
			})
		})
		if (!response.ok) throw new Error('Error deleting accounts')

		const data: { deletedAccounts: Array<{ id: string }> } =
			await response.json()
		revalidatePath('/accounts')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting accounts' }
	}
}

export const getAccount = async (accountId: string) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl(`/accounts/${accountId}`)
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Auhorization: `Bearer ${session}`
			}
		})
		if (!response.ok) return { error: 'Error getting account' }

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
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl(`/accounts/${accountId}`)
		const response = await fetch(apiUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			},
			body: JSON.stringify({
				name
			})
		})
		if (!response.ok) return { error: 'Error updating account' }

		const data: { account: Account } = await response.json()
		revalidatePath('/accounts')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error updating account' }
	}
}

export const deleteAccount = async (accountId: string) => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl(`/accounts/${accountId}`)
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			}
		})
		if (!response.ok) return { error: 'Error deleting account' }

		const data: { deletedAccount: { id: string } } = await response.json()
		revalidatePath('/accounts')
		revalidatePath('/transactions')
		revalidatePath('/summary')
		return data
	} catch (error) {
		return { error: 'Error deleting account' }
	}
}

export const getAccountsAction = async () => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const accounts = await getAccountsService()
		if (!accounts) throw new Error('Error getting accounts')

		return accounts
	} catch (error) {
		return { error: 'Error getting accounts' }
	}
}

export const getAccounts = async () => {
	try {
		const session = (await cookies()).get('session')?.value
		if (!session) throw new Error('No session')

		const apiUrl = getAPIUrl('/accounts')
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session}`
			}
		})
		if (!response.ok) throw new Error('Failed to fetch accounts')

		const data: { accounts: Account[] } = await response.json()
		return data
	} catch (error) {
		console.error(error)
		throw new Error('Failed to fetch accounts')
	}
}
