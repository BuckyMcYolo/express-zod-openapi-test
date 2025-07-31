import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
  boolean,
} from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod' // Not needed for manual schemas
import { z } from 'zod/v4'
import { ez } from 'express-zod-api'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
})

export type User = InferSelectModel<typeof usersTable>
export type NewUser = InferInsertModel<typeof usersTable>

export const usersSelectSchema = createSelectSchema(usersTable)
export const usersInsertSchema = createInsertSchema(usersTable)

// Express-zod-api compatible schemas
export const selectUserSchema = z.object({
  id: z.number(),
  createdAt: ez.dateOut(),
  updatedAt: ez.dateOut(),
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
})

export const insertUserSchema = z.object({
  name: z.string().min(1).max(255),
  age: z.number().int().min(0),
  email: z.string().email().max(255),
  createdAt: ez.dateIn().optional(),
  updatedAt: ez.dateIn().optional(),
})

export const todosTable = pgTable('todos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  completed: boolean().notNull().default(false),
})

export type Todo = InferSelectModel<typeof todosTable>
export type NewTodo = InferInsertModel<typeof todosTable>

// Express-zod-api compatible schemas
export const selectTodoSchema = z.object({
  id: z.number(),
  createdAt: ez.dateOut(),
  updatedAt: ez.dateOut(),
  title: z.string(),
  description: z.string().nullable(),
  completed: z.boolean(),
})

export const insertTodoSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  completed: z.boolean().optional().default(false),
  createdAt: ez.dateIn().optional(),
  updatedAt: ez.dateIn().optional(),
})
