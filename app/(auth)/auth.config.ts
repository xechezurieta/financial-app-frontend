import { NextAuthConfig } from 'next-auth'

const protectedRoutes = [
	'/dashboard',
	'/accounts',
	'/categories',
	'/transactions',
	'/my-profile'
]

export const authConfig = {
	pages: {
		signIn: '/login',
		newUser: '/register',
		error: '/login' // Add error page
	},
	session: {
		strategy: 'jwt',
		maxAge: 8 * 60 * 60 // 8 hours
	},
	providers: [],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user
			const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname)
			const isOnAuthPage =
				nextUrl.pathname.startsWith('/login') ||
				nextUrl.pathname.startsWith('/register')

			if (!isLoggedIn && isOnProtectedRoute) {
				return false // Redirect to login
			}

			if (isLoggedIn && isOnAuthPage) {
				return Response.redirect(new URL('/dashboard', nextUrl))
			}

			return true
		},
		jwt: async ({ token, user }) => {
			if (user) {
				token.user = user
			}
			return token
		},
		session: async ({ session, token }) => {
			session.user = token.user as any
			return session
		}
	}
} satisfies NextAuthConfig
