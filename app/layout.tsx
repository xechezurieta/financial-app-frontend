import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import TanstackProvider from '@/providers/tanstack-provider'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Financial',
	description: 'Plataforma de control financiero'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={` antialiased`}>
				<TanstackProvider>
					{children}

					<Toaster richColors />
				</TanstackProvider>
			</body>
		</html>
	)
}
