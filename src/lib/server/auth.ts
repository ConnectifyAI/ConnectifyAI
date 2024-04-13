import { Lucia } from 'lucia'
import { dev } from '$app/environment'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db';
import { session, user } from './db/schema';
import { GitHub, Google } from 'arctic';

import {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,

    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET

} from '$env/static/private'
import { redirect } from '@sveltejs/kit';

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);
//https://github.com/bmdavis419/SvelteKit-Ecommerce/blob/main/src/lib/server/auth.ts

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET)

//TODO: place of failure i think for google oauth
const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:5173`;

const redirectUrl = `${baseUrl}/auth/callback/google`

export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUrl)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    },
    getUserAttributes: (data) => {
        return {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            isAdmin: data.isAdmin,
        }
    }
});

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: {
            firstName: string;
            lastName: string;
            isAdmin: boolean;
            email: string;
        };
    }
}

export function ensureAdmin(locals: App.Locals){
    if (!locals.user || !locals.session){
        redirect(303, '/auth/login');
    }

    if (!locals.user.isAdmin){
        redirect(303, '/')
    }
}
