import { toast } from 'sonner'

import { getAccounts } from '@/features/accounts/account-api'
import AccountsTable from '@/features/accounts/components/accounts-table'

export default async function AccountsTableWrapper() {
	const data = await getAccounts()
	if (data && 'error' in data) {
		toast.error('Ha ocurrido un error obteniendo las cuentas')
		return null
	}

	return <AccountsTable accounts={data.accounts} />
}
