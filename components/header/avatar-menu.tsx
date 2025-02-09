'use client'
import { LogOut } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
export default function AvatarMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src='https://ui-avatars.com/api/?background=random' />
					<AvatarFallback>UN</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-48'>
				<DropdownMenuItem onClick={() => console.log('Logout clicked')}>
					<LogOut className='mr-2 size-4' />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
