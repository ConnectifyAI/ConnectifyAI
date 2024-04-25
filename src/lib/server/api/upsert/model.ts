import { db } from '$lib/server/db'
import { inFeature, node, outFeature } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import type { Node as APINode, Feature as APIFeature, ModelInfo } from '../apiTypes'
import { convertNode } from '$lib/server/helpers/convert'

export async function createModelNode(
	modelInfo: ModelInfo,
	graphId: string,
	position: {
		x: number
		y: number
	}
): Promise<APINode> {
	const newNode = (
		await db
			.insert(node)
			.values({
				repoId: modelInfo.repoId,
				displayName: modelInfo.repoId,
				parentGraphId: graphId,
				type: 'modelNode',
				posX: position.x,
				posY: position.y
			})
			.returning()
	)[0]

	//2 features
	let outs: Feature[] = []
	for (const out of modelInfo.outputFeatures) {
		outs.push({
			isSelected: false,
			label: out.label,
			dtype: out.dtype,
			parentNodeId: newNode.id
		})
	}
	const outFeatures = await db.insert(outFeature).values(outs).returning()

	let ins: Feature[] = []

	for (const input of modelInfo.inputFeatures) {
		ins.push({
			isSelected: false,
			label: input.label,
			dtype: input.dtype,
			parentNodeId: newNode.id
		})
	}

	const inFeatures = await db.insert(inFeature).values(ins).returning()

	const returnedNode = await db.query.node.findFirst({
		where: eq(node.id, newNode.id),
		with: {
			inFeatures: true,
			outFeatures: true
		}
	})

	if (!returnedNode) {
		throw new Error('was not able to send node to db')
	}

	// @ts-ignore WE NEED A NEW NAME OTHER THAN NODES BRO
	return convertNode(returnedNode)
}
