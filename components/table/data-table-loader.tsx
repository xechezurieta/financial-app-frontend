import { Loader2 } from 'lucide-react'

export default function DataTableLoader() {
	return (
		<div className='h-[500px] w-full flex items-center justify-center'>
			<Loader2 className='size-6 text-slate-300 animate-spin' />
		</div>
	)
}
