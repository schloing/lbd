import { DurableObject } from "cloudflare:workers";
import { BoardInstruction } from "../../../src/lib/board"
import { type UUID } from 'node:crypto';

export class Connections extends DurableObject {
	sessions: Map<WebSocket, BoardInstruction[]>;
	state: DurableObjectState;

	constructor(state: DurableObjectState, env: Env) {
		super(state, env);
		this.sessions = new Map();
		this.state = state;

		state.getWebSockets().forEach((ws) => {
			const meta = ws.deserializeAttachment();
			this.sessions.set(ws, { ...meta });
		});
	}

	public async fetch(request: Request): Promise<Response> {
		if (request.headers.get("Upgrade") != "websocket") return new Response(null, { status: 400 });
		const pair = new WebSocketPair();
		await this.handleSession(pair[1], <BoardInstruction><unknown>request.body);
		return new Response(null, { status: 101, webSocket: pair[0] });
	}

	private async handleSession(ws: WebSocket, board: BoardInstruction) {
		this.state.acceptWebSocket(ws);
		ws.serializeAttachment({ ...ws.deserializeAttachment() ?? board });
		const ins = this.sessions.get(ws) ?? [];
		ins.push(board);
		this.sessions.set(ws, ins);
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === "POST") {
			const id = env.Connections.idFromName("GLOBAL_CONNECTIONS");
			const stub = env.Connections.get(id);
			return stub.request(request);
		}

		return new Response(null, { status: 400 });
	},
} satisfies ExportedHandler<Env>;