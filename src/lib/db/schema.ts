import {
    timestamp,
    pgTable,
    text,
    integer,
    primaryKey,
	boolean,
    uuid,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
    id: uuid("id").notNull().notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    imageURL: text("image"),
});

export const accounts = pgTable(
    "account",
    {
        userId: uuid("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    ],
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().notNull().primaryKey(),
    userId: uuid("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const boards = pgTable('boards', {
    id: uuid('id').notNull().primaryKey(),
    name: text('name').notNull(),
    ownerId: uuid('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    participants: integer('participants').default(0),
    points: integer('points').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    private: boolean('private').default(false)
});

export const rankings = pgTable('rankings', {
    id: uuid('id').notNull().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    boardId: uuid('board_id').notNull().references(() => boards.id, { onDelete: 'cascade' }),
    points: integer('points').default(0)
});

export const userRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    boards: many(boards),
    rankings: many(rankings)
}));

export const accountRelations = relations(accounts, ({ one }) => ({
    user: one(users)
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
    user: one(users)
}));

export const boardRelations = relations(boards, ({ one, many }) => ({
    owner: one(users),
    rankings: many(rankings)
}));

export const rankingRelations = relations(rankings, ({ one }) => ({
    user: one(users),
    board: one(boards)
}));