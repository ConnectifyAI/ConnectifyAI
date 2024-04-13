import { relations } from "drizzle-orm";
import { pgTable, serial, uuid } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),

})

export const nodes = pgTable('nodes', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),

})

export const edges = pgTable('edges', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
})

export const nodesRelations = relations(nodes, ({many}) => ({
    edges: many(edges)
}))

export const edgesRelations = relations(edges, ({one}) =>({
    tail: one(nodes),
    head: one(nodes),

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
