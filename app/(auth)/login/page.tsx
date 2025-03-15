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
		<div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
			<div className='h-full flex-col items-center justify-center px-4 lg:flex'>
				<div className='space-y-4 pt-16 text-center'>
					<h1 className='text-3xl font-bold'>¡Bienvenido!</h1>
					<p className='text-base'>
						Inicia sesión o crea una cuenta para volver.
					</p>
				</div>
				<div className='mt-8 flex items-center justify-center'>
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
			<div className='hidden h-full items-center justify-center bg-blue-700 lg:flex'>
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
