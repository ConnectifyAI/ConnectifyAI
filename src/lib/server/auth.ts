import { Lucia } from 'lucia'
import { dev } from '$app/environment'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db';
import { session, user } from './db/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);
