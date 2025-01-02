import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

const timestamps = {
	updatedAt: text('updated_at').notNull().default(sql`current_timestamp`),
	createdAt: text('created_at').notNull().default(sql`current_timestamp`),
};

export const boards = sqliteTable('boards', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	owner: text('owner').notNull().references(() => user.id),
	participants: integer('participants').notNull().default(0),
	points: integer('points').default(0),
	...timestamps,
});

export const rankings = sqliteTable('rankings', {
	id: text('id').notNull().primaryKey(),
	boardId: text('boardId').notNull().references(() => boards.id),
	user: text('user').notNull().references(() => user.id),
	points: integer('points').notNull().default(0),
});

export const user = sqliteTable('users', {
	id: text('id').notNull().primaryKey(),
	username: text('username').notNull().unique(),
	display: text('display').notNull().default("anonymous gooner"),
	passwordHash: text('password_hash').notNull(),
	...timestamps,
});

export const session = sqliteTable('sessions', {
	id: text('id').notNull().primaryKey(),
	user: text('user').notNull().references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

export type Boards = typeof boards.$inferSelect;
export type Rankings = typeof rankings.$inferSelect;
export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;