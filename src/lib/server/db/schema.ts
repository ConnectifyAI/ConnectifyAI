import { relations } from "drizzle-orm";
import { pgEnum, pgTable, uuid, text, boolean, primaryKey, timestamp, json, integer } from "drizzle-orm/pg-core";

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
    }).notNull()
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
    name: text('name').notNull()

})

export const graphRelations = relations(graph, ({ many, one }) => ({
    nodes: many(node),
    author: one(user, {
        fields: [graph.authorId],
        references: [user.id]
    })

}))

export const nodeTypeEnum = pgEnum('node_type', ['dataset', 'model'])

export const node = pgTable('node', {
    id: uuid('id').primaryKey().notNull().unique(),
    repoId: text('repo_id').notNull(),
    displayName: text('display_name').notNull(),
    parentGraphId: uuid('parent_graph_id').notNull().references(() => graph.id),
    nodeType: nodeTypeEnum('node_type').notNull(),
    position: json('position').notNull(),
})

export const nodesRelations = relations(node, ({ many, one }) => ({

    outputs: many(output, {
        relationName: "outgoing"
    }),
    inputs: many(input, {
        relationName: "incoming"
    }),

    parentGraph: one(graph, {
        fields: [node.parentGraphId],
        references: [graph.id],
    })

}))

export const output = pgTable('output', {
    id: uuid('id').primaryKey().notNull().unique(),
    parentNodeId: uuid('parent_node_id').notNull().references(() => node.id),
})

export const outputRelations = relations(output, ({ one }) => ({

    parentNode: one(node, {
        fields: [output.parentNodeId],
        references: [node.id],
        relationName: "outgoing"
    }),

    edge: one(edge)

}))

export const input = pgTable('input', {
    id: uuid('id').primaryKey().notNull().unique(),
    parentNodeId: uuid('parent_node_id').notNull().references(() => node.id),
})

export const inputRelations = relations(output, ({ one }) => ({

    parentNode: one(node, {
        fields: [output.parentNodeId],
        references: [node.id],
        relationName: "incoming"
    }),

    edge: one(edge)

}))

export const edge = pgTable('edge', {

    id: uuid('id').defaultRandom().primaryKey().unique().notNull(),

    sourceId: uuid('source_id').notNull().references(() => output.id),
    targetId: uuid('target_id').notNull().references(() => input.id)

})

export const edgeRelations = relations(edge, ({ one }) => ({

    source: one(output, {
        fields: [edge.sourceId],
        references: [output.id],
        relationName: "source"
    }),

    target: one(input, {
        fields: [edge.targetId],
        references: [input.id],
        relationName: "target"
    }),

}))

