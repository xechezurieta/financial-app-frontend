import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
	return (
		<Link href='/' aria-label='Go to home page'>
			<div className='hidden lg:flex lg:items-center'>
				<Image
					className='size-11'
					src='/financial-logo.png'
					width={100}
					height={100}
					alt='Financial logo'
				/>
				<p className='ml-2 text-2xl font-semibold text-white'>Financial</p>
			</div>
		</Link>
	)
}
