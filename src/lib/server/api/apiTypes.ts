export type NodeType = 'dataset' | 'model'

export type Edge = {
    id: string;
    sourceId: string;
    targetId: string;
}

export type Output = {
    id: string;
    parentNodeId: string;
    label: string;
    dtype: string;
    edge: Edge;
}


export type Input = {
    id: string;
    parentNodeId: string;
    label: string;
    dtype: string;
    edge: Edge;
}

export type Node = {
    id: string;
    repoId: string;
    displayName: string;
    parentGraphId: string;
    nodeType: string;
    outputs: Output[];
    inputs: Input[];
    posX: number,
    posY: number
}

export type Author = {
    id: string;
    provider: string;
    providerId: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    email: string;
}

export type Graph = {
    id: string;
    authorId: string;
    likes: number;
    forks: number;
    name: string;
    author: Author;
    nodes: Node[];
}
