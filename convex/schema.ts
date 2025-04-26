import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Define your schema here
  users: defineTable({
    userId: v.string(), // The userId of the Clerk User
    name: v.string(), // The name of the user
    email: v.string(), // The email of the user
    isPro: v.boolean(), // Whether the user is a pro user or not
    proSince: v.optional(v.number()), // The date when the user became a pro user
    lemonsqueezyCustomerId: v.optional(v.string()), // The LemonSqueezy customer ID of the user
    lemonsqueezyOrderId: v.optional(v.string()), // The LemonSqueezy order ID of the user
  }).index("by_user_id", ["userId"]),

  codeExecutions: defineTable({
    userId: v.string(), // The userId of the Clerk User
    language: v.string(), // The language of the code execution
    code: v.string(), // The code to be executed
    output: v.optional(v.string()), // 👈 optional
    error: v.optional(v.string()), // The error of the code execution optional
  }).index("by_user_id", ["userId"]),

  snippets: defineTable({
    userId: v.string(), // The userId of the Clerk User
    title: v.string(), // The title of the snippet
    code: v.string(), // The code of the snippet
    language: v.string(), // The language of the snippet
    userName: v.string(), // The username of the user
  }).index("by_user_id", ["userId"]),

  snippetsComments: defineTable({
    snippetId: v.id("snippets"), // The id of the snippet
    userId: v.string(), // The userId of the Clerk User
    comment: v.string(), // The comment of the user
    userName: v.string(), // The username of the user
  }).index("by_snippet_id", ["snippetId"]),

  stars: defineTable({
    snippetId: v.id("snippets"), // The id of the snippet
    userId: v.string(), // The userId of the Clerk User
  })
    .index("by_snippet_id", ["snippetId"])
    .index("by_user_id", ["userId"])
    .index("by_snippet_id_and_user_id", ["snippetId", "userId"]),
});
