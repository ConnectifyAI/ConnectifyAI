import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { edge, graph, input, node, output } from "./src/lib/server/db/schema";
import { NodeType } from "./src/lib/data/node";
import { node2, outputs1_1 } from "./seed";
import { exit, sourceMapsEnabled } from "process";



async function seed() {

	let connectionString = process.env.DATABASE_URL;
	// console.log(process.env)
	//

	if (!connectionString) {
		throw new Error("No connection string")
	}

	const client = postgres(connectionString, { prepare: false })
	const db = drizzle(client)


	//TODO: create new graph

	const graph1 = {
		authorId: "qmw1xs4m56qgozch3v6d96ep6fi7eaevdwxxperg",
		likes: 69,
		forks: 420,
		name: "w graph"
	}

	let returnedGraph = await db.insert(graph).values(graph1).returning()

	const graphId = returnedGraph[0].id

	const node1Id = crypto.randomUUID()

	const node1 = {
		id: node1Id,
		repoId: "suriai/whisper_noises",
		displayName: "W dataset",
		parentGraphId: graphId,
		nodeType: "dataset" as NodeType,
		posX: 100,
		posY: 300,
	}

	let returnedNode1 = await db.insert(node).values(node1).returning()

	const node2Id = crypto.randomUUID()

	const node2 = {
		id: node2Id,
		repoId: "alb123/midModel",
		displayName: "cringe model",
		parentGraphId: graphId,
		nodeType: 'model' as NodeType,
		posX: 400,
		posY: 200,
	}

	let returnedNode2 = await db.insert(node).values(node2).returning()


	const output1_id = crypto.randomUUID()

	const output1 = {
		id: output1_id,
		parentNodeId: node1Id,
		label: "cool export",
		dtype: "text"
	}


	const returningOutput1 = await db.insert(output).values(output1).returning()

	const output2_id = crypto.randomUUID()

	const output2 = {
		id: output2_id,
		parentNodeId: node1Id,
		label: "notLabel",
		dtype: "number"
	}

	const returningOutput2 = await db.insert(output).values(output2).returning()

	const input1_id = crypto.randomUUID()

	const input1 = {
		id: input1_id,
		parentNodeId: node2Id,
		label: "absorb",
		dtype: "text"
	}

	const returningInput1 = await db.insert(input).values(input1).returning()

	const input2_id = crypto.randomUUID()

	const input2 = {
		id: input2_id,
		parentNodeId: node2Id,
		label: "interestng Label",
		dtype: "number"
	}

	const returningInput2 = await db.insert(input).values(input2).returning()

	const edge1 = {
		id: crypto.randomUUID(),
		sourceId: output1_id,
		targetId: input1_id,
	}

	const returningEdge1 = await db.insert(edge).values(edge1).returning()

	const edge2 = {
		id: crypto.randomUUID(),
		sourceId: output2_id,
		targetId: input2_id,
	}

	const returningEdge2 = await db.insert(edge).values(edge2).returning()

	exit(0)

}

await seed()


