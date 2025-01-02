import { randomUUID, UUID } from 'node:crypto';
import * as table from '../../../src/lib/server/db/schema';
import { eq } from 'drizzle-orm';

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		const authHeader = request.headers.get("authentication");
		const boardHeader = request.headers.get("board");

		if (!authHeader || !boardHeader)
			return Response.json({ code: 404, error: "header not found" });

		const boardDatabase = env.DB.select().from(table.boards).where(eq(table.boards.id, boardHeader));

		const board = env.LeaderboardInstance.idFromName(boardHeader);

		return new Response("hello world");
	},
} satisfies ExportedHandler<Env>;

export * from "./board";