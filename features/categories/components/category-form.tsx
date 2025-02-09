'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormItem,
	FormField,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
	name: z.string()
})

type FormValues = z.infer<typeof formSchema>

type CategoryFormProps = {
	id?: string
	defaultValues?: FormValues
	onSubmit: (values: FormValues) => void
	onDelete?: () => void
	disabled?: boolean
}

export default function CategoryForm({
	id,
	defaultValues,
	onSubmit,
	onDelete,
	disabled
}: CategoryFormProps) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const handleSubmit = (values: FormValues) => {
		onSubmit(values)
	}

	const handleDelete = () => {
		onDelete?.()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-4 pt-4'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre</FormLabel>
							<FormControl>
								<Input
									disabled={disabled}
									placeholder='Ej: comida, transporte, viajes, vivienda.'
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='w-full' disabled={disabled}>
					{id ? 'Guardar cambios' : 'Crear cateogría'}
				</Button>
				{!!id && (
					<Button
						type='button'
						disabled={disabled}
						onClick={handleDelete}
						className='w-full'
						variant='outline'
					>
						<Trash className='size-4 mr-2' />
						Eliminar categoría
					</Button>
				)}
			</form>
		</Form>
	)
}
