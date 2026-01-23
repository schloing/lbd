import { db } from "$/index";
import { eq } from "drizzle-orm";
import { boards } from "../db/schema";

export async function getBoardById(boardId: string) {
    const board = await db.select().from(boards).where(eq(boards.id, boardId));
    return board.length > 0 ? board[0] : null;
}