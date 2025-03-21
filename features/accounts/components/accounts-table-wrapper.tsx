import { getAccounts } from '@/features/accounts/account-api'
import AccountsTable from '@/features/accounts/components/accounts-table'

export default async function AccountsTableWrapper() {
	const data = await getAccounts()
	if (data && 'error' in data) {
		return null
	}
	console.log('GET ACCOUNTS', data)

	return <AccountsTable accounts={data.accounts} />
}
