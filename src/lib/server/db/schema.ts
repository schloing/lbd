import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { randomUUID } from "node:crypto";

export const boards = sqliteTable('boards', {
	id: text('id').primaryKey().default(randomUUID()),
	name: text('name').notNull(),
	owner: text('owner').notNull().references(() => user.id),
	participants: integer('participants').notNull().default(0),
	points: integer('points').default(0),
	created: integer('created', { mode: 'timestamp' }).default(new Date()),
});

export const rankings = sqliteTable('rankings', {
	id: text('id').primaryKey().default(randomUUID()),
	user: text('user').notNull().references(() => user.id),
	points: integer('points').notNull().default(0),
});

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	created: integer('created', { mode: 'timestamp' }).default(new Date()),
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	user: text('user').notNull().references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Boards = typeof boards.$inferSelect;

export type rankings = typeof boards.$inferSelect;