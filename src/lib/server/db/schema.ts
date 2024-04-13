import { relations } from "drizzle-orm";
import { pgEnum, pgTable, uuid, text, boolean, primaryKey, timestamp } from "drizzle-orm/pg-core";

//TODO: everything else lmfao
//

export const providerEnum = pgEnum('provider', ['google', 'github']);

export const user = pgTable('user', {
    //this isnt primary key, going to use composite for data
    id: text('id').notNull().unique(),
    provider: providerEnum('provider').notNull(),
    providerId: text('provider_id').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    isAdmin: boolean('is_admin').notNull(),
    email: text('email').notNull(),
},
    //NOTE: in all honesty, i dont really know why you would want to do this
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
        relationName: "user"
    })
}))

export const graph = pgTable('graph', {
    id: uuid('id').defaultRandom().primaryKey().notNull().unique(),

})

export const graphRelations = relations(graph, ({ many }) => ({
    nodes: many(node)
}))

export const node = pgTable('node', {
    id: uuid('id').defaultRandom().primaryKey().notNull().unique(),
    parentGraphId: uuid('parent_graph_id').notNull().references(() => graph.id)

})

export const nodesRelations = relations(node, ({ many, one }) => ({

    outgoingEdges: many(edge),
    incomingEdges: many(edge),

    parentGraph: one(graph, {
        fields: [node.parentGraphId],
        references: [graph.id],
        relationName: "parent_graph"
    })

}))

export const edge = pgTable('edge', {
    id: uuid('id').defaultRandom().primaryKey().notNull().unique(),
    tailId: uuid('tail_id').notNull().references(() => node.id),
    headId: uuid('head_id').notNull().references(() => node.id),
})

export const edgeRelations = relations(edge, ({ one }) => ({
    tail: one(node, {
        fields: [edge.tailId],
        references: [node.id],
        relationName: "tail"
    }),
    head: one(node, {
        fields: [edge.headId],
        references: [node.id],
        relationName: "head"
    }),
}))

