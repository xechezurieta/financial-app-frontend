// components/LoginForm.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { login } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
	email: z.string().email('Introduce un email válido'),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

export function LoginForm() {
	const [isPending, startLoginTransition] = useTransition()
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		startLoginTransition(async () => {
			const data = await login(values)
			if (data.status === 'failed') {
				toast.error('Credenciales inválidas')
			} else if (data.status === 'invalid_data') {
				toast.error('No se ha podido validar los datos')
			} else if (data.status === 'success') {
				router.refresh()
			}
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Correo electrónico</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter your email'
									{...field}
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contraseña</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										type={showPassword ? 'text' : 'password'}
										placeholder='Enter your password'
										{...field}
										disabled={isPending}
										className=' pr-10'
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
									>
										{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
									</button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='w-full text-white'
					disabled={isPending}
				>
					{isPending && <Loader2 size={16} className='mr-2 animate-spin' />}
					{isPending ? 'Iniciando sesión' : 'Iniciar sesión'}
				</Button>
			</form>
		</Form>
	)
}
