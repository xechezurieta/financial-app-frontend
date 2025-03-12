import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = [
	'/accounts',
	'/categories',
	'/dashboard',
	'/transactions'
]
export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const sessionCookie = request.cookies.get('session')
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	)

	if (isProtectedRoute && !sessionCookie) {
		return NextResponse.redirect(new URL('/login', request.url))
	}
	if (!isProtectedRoute && sessionCookie) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
