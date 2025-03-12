import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { PublicUserInfo } from '@/types/types'

export async function verifyToken(input: string) {
	const decodedToken = jwt.verify(input, process.env.JWT_SECRET!)
	return { user: decodedToken as PublicUserInfo }
}

export async function getSession() {
	const session = (await cookies()).get('session')?.value
	if (!session) return null
	return await verifyToken(session)
}

/* export async function setSession(user: NewUser) {
	const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000)
	const session: SessionData = {
		user: { id: user.id! },
		expires: expiresInOneDay.toISOString()
	}
	const encryptedSession = await signToken(session)
	;(await cookies()).set('session', encryptedSession, {
		expires: expiresInOneDay,
		httpOnly: true,
		secure: true,
		sameSite: 'lax'
	})
} */
