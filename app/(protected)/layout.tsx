import Header from '@/components/header/header'
import SheetProvider from '@/providers/sheet-provider'

export default function ProtectedLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header />
			<main className='px-3 lg:px-14'>
				<SheetProvider />
				<div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
					{children}
				</div>
			</main>
		</>
	)
}
