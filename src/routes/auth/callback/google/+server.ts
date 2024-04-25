import { google, lucia } from '$lib/server/auth'
import { db } from '$lib/server/db'
import { and, eq } from 'drizzle-orm'
import type { RequestEvent } from './$types'
import { user } from '$lib/server/db/schema'
import { generateId } from 'lucia'
import { OAuth2RequestError } from 'arctic'

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code')
	const state = event.url.searchParams.get('state')

	const storedState = event.cookies.get('state')
	const storedCodeVerifier = event.cookies.get('code_verifier')

	if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
		throw new Error('invalid request')
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier)
		const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		})

		const googleUser = (await response.json()) as GoogleUser

		const existingUser = await db.query.user.findFirst({
			where: and(eq(user.provider, 'google'), eq(user.providerId, googleUser.sub))
		})

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			})
		} else {
			const userId = generateId(40)
			await db.insert(user).values({
				id: userId,
				provider: 'google',
				providerId: googleUser.sub,
				email: googleUser.email,
				firstName: googleUser.given_name,
				lastName: googleUser.family_name,
				isAdmin: false
			})

			const session = await lucia.createSession(userId, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			})
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/proc/'
			}
		})
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400
			})
		}

		return new Response(null, {
			status: 500
		})
	}
}

type GoogleUser = {
	sub: string
	name: string
	given_name: string
	family_name: string
	picture: string
	email: string
	email_verified: boolean
	locale: string
}
