'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
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
import { authClient } from '@/lib/auth'

const formSchema = z.object({
	name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
	email: z.string().email('Introduce un email válido'),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

export function SignupForm() {
	const [isPending, startSignupTransition] = useTransition()
	const [showPassword, setShowPassword] = useState(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		startSignupTransition(async () => {
			const { data, error } = await authClient.signUp.email(
				{
					email: values.email,
					password: values.password,
					name: values.name,
					callbackURL: '/app/dashboard'
				},
				{
					onSuccess: (ctx) => {
						console.log({ ctx })
						toast.success('Cuenta creada correctamente')
					},
					onError: (err) => {
						console.error(err)
						toast.error('Error al crear la cuenta')
					}
				}
			)
			console.log({ data, error })
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter your name'
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
										className='pr-10'
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
					{isPending ? 'Creando cuenta' : 'Crear cuenta'}
				</Button>
			</form>
		</Form>
	)
}
