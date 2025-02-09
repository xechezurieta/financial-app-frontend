import { Loader2 } from 'lucide-react'

export default function LoadingContainer() {
	return (
		<div className='flex justify-center items-center absolute inset-0'>
			<Loader2 className='size-4 text-muted-foreground animate-spin' />
		</div>
	)
}
