import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { edge, graph, inFeature, node, outFeature, } from "./src/lib/server/db/schema";
import { exit } from "process";

type NodeType = 'datasetNode' | 'modelNode'

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
		authorId: "ki89hktm1vsshofbjimysxbpibo9uie7hqkxcxcn",
		likes: 69,
		forks: 420,
		name: "w graph"
	}

	let returnedGraph = await db.insert(graph).values(graph1).returning()

	const graphId = returnedGraph[0].id


	const node1 = {
		repoId: "suriai/whisper_noises",
		displayName: "W dataset",
		parentGraphId: graphId,
		type: "datasetNode" as NodeType,
		posX: 100,
		posY: 300,
	}

	let returnedNode1 = await db.insert(node).values(node1).returning()

	let node1Id = returnedNode1[0].id

	console.log("inserted", returnedNode1)

	const node2 = {
		repoId: "alb123/midModel",
		displayName: "cringe model",
		parentGraphId: graphId,
		type: 'modelNode' as NodeType,
		posX: 400,
		posY: 200,
	}

	let returnedNode2 = await db.insert(node).values(node2).returning()
	let node2Id = returnedNode2[0].id

	console.log("inserted", returnedNode2)

	const node3 = {
		repoId: "alb123/midModel",
		displayName: "cringe model",
		parentGraphId: graphId,
		type: 'modelNode' as NodeType,
		posX: 400,
		posY: 200,
	}

	let returnedNode3 = await db.insert(node).values(node2).returning()
	let node3Id = returnedNode2[0].id

	console.log("inserted", returnedNode3)


	const outFeatureDS1 = await db.insert(outFeature).values({
		parentNodeId: node1Id,
		isSelected: false,
		label: "cool data",
		dtype: "string",
	}).returning()


	const outFeatureDS2 = await db.insert(outFeature).values({
		parentNodeId: node1Id,
		isSelected: false,
		label: "some data",
		dtype: "string",
	}).returning()

	const outFeatureN1_1 = await db.insert(outFeature).values({
		parentNodeId: node2Id,
		isSelected: false,
		label: "lol",
		dtype: "string",
	})

	const outFeatureN1_2 = await db.insert(outFeature).values({
		parentNodeId: node2Id,
		isSelected: false,
		label: "lol1",
		dtype: "string",
	})

	const outFeatureN1_3 = await db.insert(outFeature).values({
		parentNodeId: node2Id,
		isSelected: false,
		label: "lol2",
		dtype: "string",
	})

	const inFeatureN1_1 = await db.insert(inFeature).values({
		parentNodeId: node2Id,
		isSelected: false,
		label: "something",
		dtype: "string"
	})


	const inFeatureN1_2 = await db.insert(inFeature).values({
		parentNodeId: node2Id,
		isSelected: false,
		label: "something1",
		dtype: "string"
	})

	const inFeatureN2_1 = await db.insert(inFeature).values({
		parentNodeId: node3Id,
		isSelected: false,
		label: "lmfao",
		dtype: "string"
	})


	const inFeatureN2_2 = await db.insert(inFeature).values({
		parentNodeId: node3Id,
		isSelected: false,
		label: "lmfao1",
		dtype: "string"
	})

	exit(0)

}

await seed()


