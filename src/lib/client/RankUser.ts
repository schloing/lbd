import z from "zod";

export interface RankUser {
    name: string;
    username?: string; // cached username from uuid in users
    uuid?: string; // only valid if accountAssociated
    board: string;
    accountAssociated: boolean;
};

export interface ScoreUser {
    user: RankUser;
    score: number;
};

export const ZodRankUser = z.strictObject({
    name: z.string(),
    username: z.string().optional().nullable(),
    uuid: z.string().optional().nullable(),
    board: z.string(),
    accountAssociated: z.boolean(),
});

export const ZodScoreUser = z.strictObject({
    user: ZodRankUser,
    score: z.number(),
});