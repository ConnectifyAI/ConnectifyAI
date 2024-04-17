export type NodeType = 'datasetNode' | 'modelNode'


export interface Feature {
    isSelected: boolean;
    label: string;
    dtype: string;
}

export interface Node {
    id: string;
    type: NodeType;
    position: {
        x: number,
        y: number
    }
    data: {
        displayName: string,
        repoId: string;
        inFeatures: Feature[];
        outFeatures: Feature[];
    }
}


export interface Edge {
    id: string;
    source: string; //source node id
    target: string; // target node id
    sourceHandle: string; // name of source feature
    targetHandle: string; // name of target feature
}

export interface Author {
    id: string;
    provider: string;
    providerId: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    email: string;
}

export interface Graph {
    id: string;
    authorId: string;
    likes: number;
    forks: number;
    name: string;
    author: Author;
    nodes: Node[];
    edges: Edge[];
}



