import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
	return (
		<Link href='/'>
			<div className='lg:items-center hidden lg:flex'>
				<Image
					src='/financial-logo.png'
					width={28}
					height={28}
					alt='Financial logo'
				/>
				<p className='font-semibold text-white text-2xl ml-2'>Financial</p>
			</div>
		</Link>
	)
}
