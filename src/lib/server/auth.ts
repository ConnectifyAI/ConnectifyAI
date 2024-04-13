import { Lucia } from 'lucia'
import { dev } from '$app/environment'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db';
import { session, user } from './db/schema';
import { Github, Google } from 'artic';

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);
//https://github.com/bmdavis419/SvelteKit-Ecommerce/blob/main/src/lib/server/auth.ts
export const github = new Github
