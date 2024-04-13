import { relations } from "drizzle-orm";
import { pgTable, serial, uuid } from "drizzle-orm/pg-core";

export const graphs = pgTable('graphs', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),

})

export const nodes = pgTable('nodes', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    parentGraphId: uuid('parent_graph_id').notNull().references(() => graphs.id)

})

export const edges = pgTable('edges', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    tailId: uuid('tail_id').notNull().references(() => nodes.id),
    headId: uuid('head_id').notNull().references(() => nodes.id),
})

export const graphRelations = relations(graphs, ({ many }) => ({
    nodes: many(nodes)
}))

export const nodesRelations = relations(nodes, ({ many, one }) => ({

    outgoingEdges: many(edges),
    incomingEdges: many(edges),

    parentGraph: one(graphs, {
        fields: [nodes.parentGraphId],
        references: [graphs.id]
    })

}))

export const edgesRelations = relations(edges, ({ one }) => ({
    tail: one(nodes, {
        fields: [edges.tailId],
        references: [nodes.id]
    }),
    head: one(nodes, {
        fields: [edges.tailId],
        references: [nodes.id]
    }),
}))




// export const userRelations = relations(users, ({ many }) => ({
//   ownedTests: many(tests),
//   ownedSteps: many(steps)
//
//   //TODO: maybe we could do updated tests
// }))
//
//
// export const testRelations = relations(tests, ({ many, one }) => ({
//
//   author: one(users, {
//     fields: [tests.author_id],
//     references: [users.id]
//   }),
//
//   updatedBy: one(users, {
//     fields: [tests.updatedBy],
//     references: [users.id]
//   }),
//
//   steps: many(steps)
//
// }))
//
// export const stepRelations = relations(steps, ({ one }) => ({
//
//   author: one(users, {
//     fields: [steps.author_id],
//     references: [users.id]
//   }),
//
//   parent_test: one(tests, {
//     fields: [steps.test_id],
//     references: [tests.id]
//   }),
//
// }))
