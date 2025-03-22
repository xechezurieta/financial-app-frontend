import { Loader2 } from 'lucide-react'

export default function LoadingContainer() {
	return (
		<div
			data-testid='loading-container'
			className='absolute inset-0 flex items-center justify-center'
		>
			<Loader2
				data-testid='loading-spinner'
				className='size-4 animate-spin text-muted-foreground'
			/>
		</div>
	)
}
