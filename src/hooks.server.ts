import { lucia } from '$lib/server/auth'
import { createContext } from '$lib/trpc/context'
import { router } from '$lib/trpc/router'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { createTRPCHandle } from 'trpc-sveltekit'

//TODO: THIS HAS TO STAY LIKE THIS
export const trpc: Handle = createTRPCHandle({ router, createContext })

export const auth: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName)

	if (!sessionId) {
		event.locals.user = null
		event.locals.session = null

		if (event.url.pathname.startsWith('/proc')) {
			throw redirect(303, '/auth/login')
		}

		if (event.url.pathname === '/') {
			throw redirect(303, '/auth/login')
		}

		return resolve(event)
	}

	const { session, user } = await lucia.validateSession(sessionId)
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id)

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie()
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})
	}

	event.locals.user = user
	event.locals.session = session

	if (event.url.pathname === '/') {
		throw redirect(303, '/proc/')
	}

	return resolve(event)
}

export const handle = sequence(trpc)
