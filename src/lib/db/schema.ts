import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { users } from "./auth-schema";

export const boards = pgTable('boards', {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    ownerId: text('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    participants: integer('participants').default(0),
    points: integer('points').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    private: boolean('private').default(false)
});

export const rankings = pgTable('rankings', {
    id: text('id').notNull().primaryKey(),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    boardId: text('board_id').notNull().references(() => boards.id, { onDelete: 'cascade' }),
    points: integer('points').default(0)
});

export const boardRelations = relations(boards, ({ one, many }) => ({
    owner: one(users),
    rankings: many(rankings)
}));

export const rankingRelations = relations(rankings, ({ one }) => ({
    user: one(users),
    board: one(boards)
}));