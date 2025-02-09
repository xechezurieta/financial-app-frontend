import AvatarMenu from '@/components/header/avatar-menu'
import Filters from '@/components/header/filters'
import Logo from '@/components/header/logo'
import Navigation from '@/components/header/navigation'
import Welcome from '@/components/header/welcome'

export default function Header() {
	return (
		<header className='bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36'>
			<div className='max-w-screen-2xl mx-auto'>
				<div className='w-full flex items-center justify-between mb-14'>
					<div className='flex items-center lg:gap-x-16'>
						<Logo />
						<Navigation />
					</div>
					<AvatarMenu />
				</div>
				<Welcome />
				<Filters />
			</div>
		</header>
	)
}
