'use client'
import { LogOut } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTransition } from 'react'
import { logout } from '@/app/(auth)/actions'
import { toast } from 'sonner'
export default function AvatarMenu() {
	const [isPending, startTransition] = useTransition()
	const handleLogout = () => {
		startTransition(async () => {
			const data = await logout()
			if (data && data.status === 'failed') {
				toast.error('Error al cerrar sesión')
			}
			window.location.href = '/login'
		})
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarFallback>AV</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-48'>
				<DropdownMenuItem onClick={() => handleLogout()} disabled={isPending}>
					<LogOut className='mr-2 size-4' />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
