//TODO: easy way to seed test data

export const graph1 = {
	authorId: "qmw1xs4m56qgozch3v6d96ep6fi7eaevdwxxperg",
	likes: 69,
	forks: 420,
	name: "w graph"
}

type thing = 'dataset' | 'model'

export const node1 = {

	id: 'b10f0318-8607-4e0d-8422-21d40ee3e62b',
	repoId: "suriai/whisper_noises",
	displayName: "W dataset",
	parentGraphId: "qmw1xs4m56qgozch3v6d96ep6fi7eaevdwxxperg",
	nodeType: "dataset" as thing,
	position: {
		x: 100,
		y: 300
	}
}

export const node2 = {

	id: 'c2f28739-25f5-49ee-bc2c-a1fbbf8a320a',
	repoId: "alb123/midModel",
	displayName: "cringe model",
	parentGraphId: "qmw1xs4m56qgozch3v6d96ep6fi7eaevdwxxperg",
	nodeType: 'model' as thing,
	position: {
		x: 400,
		y: 500
	}
}

export const outputs1_1 = {
	id: 'b685be51-d360-4d49-bc67-e4b819d31d04',
	parentNodeId: 'b10f0318-8607-4e0d-8422-21d40ee3e62b'
}

export const outputs1_2 = {
	id: '5a6ccc81-5a1c-4858-9008-414846dd7927',
	parentNodeId: 'b10f0318-8607-4e0d-8422-21d40ee3e62b'
}

export const inputs2_1 = {
	id: '04f29afb-b904-4aad-8196-e3a745c33cbe',
	parentNodeId: 'c2f28739-25f5-49ee-bc2c-a1fbbf8a320a'
}

export const inputs2_2 = {
	id: '41c213e4-d2f6-44b2-bd48-540a9d2db63f',
	parentNodeId: 'c2f28739-25f5-49ee-bc2c-a1fbbf8a320a'
}

export const edge_1 = {
	id: '810f8b77-6fa4-4fc4-8ca0-72a2a052e68d',
	sourceId: "b685be51-d360-4d49-bc67-e4b819d31d04",
	targetId: '04f29afb-b904-4aad-8196-e3a745c33cbe'
}

export const edge_2 = {
	id: '810f8b77-6fa4-4fc4-8ca0-72a2a052e68d',
	sourceId: "b685be51-d360-4d49-bc67-e4b819d31d04",
	targetId: '41c213e4-d2f6-44b2-bd48-540a9d2db63f'
}

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './src/lib/server/db/schema'



let connectionString = process.env.DATABASE_URL

console.log(connectionString)


if (!connectionString) {
	// throw new Error("invalid env variables")
}

export const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { schema })

await db.insert(schema.graph).values(graph1)

await db.insert(schema.node).values(node1)
await db.insert(schema.node).values(node2)

await db.insert(schema.output).values(outputs1_1)
await db.insert(schema.output).values(outputs1_2)

await db.insert(schema.input).values(inputs2_1)
await db.insert(schema.input).values(inputs2_2)

await db.insert(schema.edge).values(edge_1)
await db.insert(schema.edge).values(edge_2)


