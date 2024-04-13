import 'dotenv/config'
import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '$env/dynamic/private'


const connectionString = env.DATABASE_URL

if (!connectionString) {
   throw new Error("invalid env variables") 
}

export const client = postgres(connectionString, {prepare: false})

export const db = drizzle(client)
