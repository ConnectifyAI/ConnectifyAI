import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { edge, graph, inFeature,  node, outFeature, } from "./src/lib/server/db/schema";
import { NodeType } from "./src/lib/data/node";
import { exit} from "process";



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

	console.log("inserted", returnedNode1)

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

	console.log("inserted", returnedNode2)


	const inFeature1 = {
		parentNodeId: node1Id,
		isSelected: true,
		label: "cool export",
		dtype: "text"
	}


	const returningInFeature1 = await db.insert(inFeature).values(inFeature1).returning()

	const inFeature1Id = returningInFeature1[0].id

	console.log("inserted", returningInFeature1)

	const inFeature2 = {
		parentNodeId: node1Id,

		isSelected: true,
		label: "notLabel",
		dtype: "number"
	}

	const returningInFeature2 = await db.insert(inFeature).values(inFeature2).returning()

	const inFeature2Id = returningInFeature2[0].id

	console.log("inserted", returningInFeature2)

	const outFeature1 = {
		isSelected: true,
		parentNodeId: node2Id,
		label: "absorb",
		dtype: "text"
	}

	const returningOutFeature1 = await db.insert(outFeature).values(outFeature1).returning()

	const outFeature1Id = returningOutFeature1[0].id

	console.log("inserted", returningOutFeature1)

	const outFeature2 = {
		isSelected: true,
		parentNodeId: node2Id,
		label: "interestng Label",
		dtype: "number"
	}

	const returningOutFeature2 = await db.insert(outFeature).values(outFeature2).returning()

	const outFeature2Id = returningOutFeature2[0].id

	console.log("inserted", returningOutFeature2)

	const outFeature3 = {
		isSelected: false,
		parentNodeId: node2Id,
		label: "lame",
		dtype: "text"
	}

	const returningOutFeature3 = await db.insert(outFeature).values(outFeature3).returning()

	const outFeature3Id = returningOutFeature3[0].id

	console.log("inserted", returningOutFeature3)

	const edge1 = {
		parentGraphId: graphId,

		sourceNodeId: node2Id,
		targetNodeId: node1Id,


		sourceFeatureId: outFeature1Id,
		targetFeatureId: inFeature1Id,
	}

	const returningEdge1 = await db.insert(edge).values(edge1).returning()

	console.log("inserted", returningEdge1)

	const edge2 = {
		parentGraphId: graphId,

		sourceNodeId: node2Id,
		targetNodeId: node1Id,


		sourceFeatureId: outFeature2Id,
		targetFeatureId: inFeature2Id,
	}

	const returningEdge2 = await db.insert(edge).values(edge2).returning()

	console.log("inserted", returningEdge2)

	exit(0)

}

await seed()


