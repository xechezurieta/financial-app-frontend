// page.tsx
import Image from 'next/image'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

import { LoginForm } from './components/login-form'
export default function Page() {
	return (
		<div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
			<div className='h-full lg:flex flex-col items-center justify-center px-4'>
				<div className='text-center space-y-4 pt-16'>
					<h1 className='font-bold text-3xl'>¡Bienvenido!</h1>
					<p className='text-base'>
						Inicia sesión o crea una cuenta para volver.
					</p>
				</div>
				<div className='flex items-center justify-center mt-8'>
					<Card>
						<CardHeader>
							<CardTitle>¡Bienvenido!</CardTitle>
							<CardDescription>
								Inicia sesión o crea una cuenta para volver.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<LoginForm />
						</CardContent>
					</Card>
				</div>
			</div>
			<div className='h-full bg-blue-700 hidden lg:flex items-center justify-center'>
				<Image
					src='/financial-logo.png'
					width={100}
					height={100}
					alt='Financial logo'
				/>
			</div>
		</div>
	)
}
