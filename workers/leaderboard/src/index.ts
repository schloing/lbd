import { DurableObject } from "cloudflare:workers";
import { BoardInstruction, BoardOperation } from "../../../src/lib/board"

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
		await this.handleSession(pair[1]);
		return new Response(null, { status: 101, webSocket: pair[0] });
	}

	private async handleSession(ws: WebSocket) {
		this.state.acceptWebSocket(ws);
		ws.serializeAttachment({ ...ws.deserializeAttachment() });
		const ins = this.sessions.get(ws) ?? [];
		this.sessions.set(ws, ins);
	}

	async webSocketMessage(ws: WebSocket, message: string) {
		const instruction = <BoardInstruction>JSON.parse(message);
		console.log(instruction.auth);
		ws.send(`[Durable Object] message: ${message}, connections: ${this.ctx.getWebSockets().length}`);
	}

	async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {
		ws.close(code, "Durable Object is closing WebSocket");
	}

	// <BoardInstruction><unknown>request.body
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === "GET") {
			const id = env.Connections.idFromName("GLOBAL_CONNECTIONS");
			const stub = env.Connections.get(id);
			return await stub.fetch(request);
		}

		return new Response(null, { status: 400 });
	},
} satisfies ExportedHandler<Env>;