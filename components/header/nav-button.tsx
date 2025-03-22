import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NavButton({
	href,
	label,
	isActive
}: {
	href: string
	label: string
	isActive: boolean
}) {
	return (
		<Button
			size='sm'
			variant='outline'
			aria-current={isActive ? 'page' : undefined}
			className={cn(
				'w-full justify-between border-none font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:w-auto',
				isActive ? 'bg-white/10 text-white' : 'bg-transparent'
			)}
		>
			<Link href={href}>{label}</Link>
		</Button>
	)
}
