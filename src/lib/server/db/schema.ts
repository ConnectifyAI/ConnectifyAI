import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

//TODO: everything else lmfao
//
export const graph = pgTable('graph', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),

})

export const node = pgTable('node', {
    id: uuid('id').defaultRandom().primaryKey().notNull().unique(),
    parentGraphId: uuid('parent_graph_id').notNull().references(() => graph.id)

})

export const edge = pgTable('edge', {
    id: uuid('id').defaultRandom().primaryKey().notNull().unique(),
    tailId: uuid('tail_id').notNull().references(() => node.id),
    headId: uuid('head_id').notNull().references(() => node.id),
})

export const graphRelations = relations(graph, ({ many }) => ({
    nodes: many(node)
}))

export const nodesRelations = relations(node, ({ many, one }) => ({

    outgoingEdges: many(edge),
    incomingEdges: many(edge),

    parentGraph: one(graph, {
        fields: [node.parentGraphId],
        references: [graph.id]
    })

}))

export const edgeRelations = relations(edge, ({ one }) => ({
    tail: one(node, {
        fields: [edge.tailId],
        references: [node.id]
    }),
    head: one(node, {
        fields: [edge.tailId],
        references: [node.id]
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
