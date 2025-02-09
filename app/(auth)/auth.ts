import NextAuth, { User, Session } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { getUser } from './actions'
import { authConfig } from './auth.config'

interface ExtendedSession extends Session {
	user: User
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			credentials: {},
			async authorize(credentials: any) {
				try {
					const user = await getUser(credentials.email, credentials.password)
					if (!user) {
						throw new Error('Invalid credentials')
					}
					return user
				} catch (error) {
					console.error('Auth error:', error)
					return null
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user
			}
			return token
		},
		async session({
			session,
			token
		}: {
			session: ExtendedSession
			token: any
		}) {
			if (token.user) {
				session.user = token.user
			}
			return session
		}
	}
})
