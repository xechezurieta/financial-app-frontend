import { Loader2 } from 'lucide-react'

export default function DataTableLoader() {
	return (
		<div
			className='flex h-[500px] w-full items-center justify-center'
			role='status'
			aria-busy='true'
		>
			<span className='sr-only'>Loading...</span>
			<Loader2 className='size-6 animate-spin text-slate-300' />
		</div>
	)
}
