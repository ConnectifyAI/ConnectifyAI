import { type Config } from "drizzle-kit";

import { env } from "process";

if (!env.DATABASE_URL) {
	throw new Error("invalid env")
}

export default {
	schema: "./src/lib/server/db/schema.ts",
	driver: "pg",
	dbCredentials: {
		connectionString: env.DATABASE_URL,
	},
	tablesFilter: ["qagent_*"],
} satisfies Config;
