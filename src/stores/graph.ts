import { type Node, type Edge } from '@xyflow/svelte'
import { writable } from 'svelte/store'

export const nodes = writable<Node[]>([])
export const edges = writable<Edge[]>([])
export const graphId = writable<string>()

export const pathMode = writable(false)
export const path = writable<string[]>([])

export const deleteNode = (id: string) => {
	nodes.update((nodes) => nodes.filter((node) => node.id !== id))
	edges.update((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id))
}
