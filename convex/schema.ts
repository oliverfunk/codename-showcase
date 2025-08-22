import { defineSchema, defineTable } from 'convex/server'
import { type Infer, v } from 'convex/values'

const schema = defineSchema({
  projects: defineTable({
    link: v.string(),
  }),
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
})
export default schema

const project = schema.tables.projects.validator
export type Project = Infer<typeof project>