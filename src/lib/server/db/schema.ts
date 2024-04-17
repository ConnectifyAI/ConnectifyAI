import { relations } from "drizzle-orm";
import { datetime } from "drizzle-orm/mysql-core";
import { pgEnum, pgTable, uuid, text, boolean, primaryKey, timestamp, integer, doublePrecision } from "drizzle-orm/pg-core";

//TODO: everything else lmfao
//

export const providerEnum = pgEnum('provider', ['google', 'github']);

export const user = pgTable('user', {

    //just to make relations easier
    id: text('id').notNull().unique(),
    provider: providerEnum('provider').notNull(),
    providerId: text('provider_id').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    isAdmin: boolean('is_admin').notNull(),
    email: text('email').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
},
    // composite primary key
    (table) => {
        return {
            pk: primaryKey({ columns: [table.provider, table.providerId] })
        }
    }
)

export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session)

}))

export const session = pgTable('session', {

    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const sessionRelations = relations(session, ({ one }) => ({

    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    })

}))

export const graph = pgTable('graph', {
    id: uuid('id').defaultRandom().primaryKey().notNull().unique(),
    authorId: text('author_id').notNull().references(() => user.id),
    likes: integer('likes').notNull(),
    forks: integer('forks').notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const graphRelations = relations(graph, ({ many, one }) => ({
    nodes: many(node),
    edges: many(edge),
    author: one(user, {
        fields: [graph.authorId],
        references: [user.id]
    })

}))

export const nodeTypeEnum = pgEnum('node_type', ['datasetNode', 'modelNode'])

export const node = pgTable('node', {
    id: uuid('id').defaultRandom().primaryKey().notNull().unique(),
    repoId: text('repo_id').notNull(),
    displayName: text('display_name').notNull(),
    parentGraphId: uuid('parent_graph_id').notNull().references(() => graph.id),
    type: nodeTypeEnum('node_type').notNull(),
    posX: doublePrecision('pos_x').notNull(),
    posY: doublePrecision('pos_y').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const nodesRelations = relations(node, ({ many, one }) => ({

    inFeatures: many(inFeature),

    outFeatures: many(outFeature),

    parentGraph: one(graph, {
        fields: [node.parentGraphId],
        references: [graph.id],
    }),

}))

export const inFeature = pgTable('in_feature', {
    id: uuid('id').defaultRandom().unique().primaryKey().notNull(),

    parentNodeId: uuid('parent_node_id').notNull().references(() => node.id),

    isSelected: boolean('is_selected').notNull(),
    label: text('label').notNull(),
    dtype: text('dtype').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),

})


export const inFeatureRelations = relations(inFeature, ({ one }) => ({

    parentNode: one(node, {
        fields: [inFeature.parentNodeId],
        references: [node.id]
    }),

    inputEdge: one(edge)

}))

export const outFeature = pgTable('out_feature', {
    id: uuid('id').defaultRandom().unique().primaryKey().notNull(),
    parentNodeId: uuid('parent_node_id').notNull().references(() => node.id),

    isSelected: boolean('is_selected').notNull(),
    label: text('label').notNull(),
    dtype: text('dtype').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),

})

export const outFeatureRelations = relations(outFeature, ({ one }) => ({

    parentNode: one(node, {
        fields: [outFeature.parentNodeId],
        references: [node.id],

    }),

    outputEdge: one(edge)

}))


export const edge = pgTable('edge', {
    id: uuid('id').defaultRandom().unique().primaryKey().notNull(),
    parentGraphId: uuid('parent_graph_id').notNull().references(() => graph.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),

    sourceNodeId: uuid('source_node_id').notNull().references(() => node.id),
    targetNodeId: uuid('target_node_id').notNull().references(() => node.id),

    sourceFeatureId: uuid('source_feature_id').notNull().references(() => outFeature.id),
    targetFeatureId: uuid('target_feature_id').notNull().references(() => inFeature.id),

})


export const edgeRelations = relations(edge, ({ one }) => ({

    parentGraph: one(graph, {
        fields: [edge.parentGraphId],
        references: [graph.id]

    }),

    targetFeature: one(inFeature, {
        fields: [edge.targetFeatureId],
        references: [inFeature.id],
        relationName: "target_feature"
    }),

    sourceFeature: one(outFeature, {
        fields: [edge.sourceFeatureId],
        references: [outFeature.id],
        relationName: "source_feature"
    }),

    targetNode: one(node, {
        fields: [edge.targetNodeId],
        references: [node.id],
        relationName: "target_node"
    }),

    sourceNode: one(node, {
        fields: [edge.sourceNodeId],
        references: [node.id],
        relationName: "source_node"
    })

}))


