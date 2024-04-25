import type { Graph as APIGraph, Node as APINode, Edge as APIEdge } from '../api/apiTypes'

// Function to convert original graph type to new graph type
export function convertGraph(originalGraph: Graph): APIGraph {
	const newNodes: APINode[] = originalGraph.nodes.map((node: Node) => {
		return convertNode(node)
	})

	const newEdges: APIEdge[] = originalGraph.edges.map((edge: Edge) => {
		return convertEdge(edge)
	})

	return {
		// id: originalGraph.id,
		// authorId: originalGraph.authorId,
		// likes: originalGraph.likes,
		// forks: originalGraph.forks,
		// name: originalGraph.name,
		// author: originalGraph.author,
		...originalGraph,
		nodes: newNodes,
		edges: newEdges
	}
}

export function convertNode(node: Node): APINode {
	const { id, type, posX, posY, displayName, repoId, inFeatures, outFeatures } = node

	return {
		id,
		type,
		position: { x: posX, y: posY },
		data: {
			displayName,
			repoId,
			//@ts-ignore types are gonna kill me
			inFeatures,
			//@ts-ignore
			outFeatures
		}
	}
}

export function convertEdge(edge: Edge): APIEdge {
	const { id, sourceNodeId, targetNodeId, sourceFeature, targetFeature } = edge
	return {
		id,
		source: sourceNodeId,
		target: targetNodeId,
		sourceHandle: sourceFeature.label,
		targetHandle: targetFeature.label
	}
}
