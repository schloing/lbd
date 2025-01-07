import { DurableObject } from "cloudflare:workers";
import { BoardInstruction } from "../../../src/lib/board"

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
	}

	private async broadcast(except: WebSocket | null, message: BoardInstruction) {
		this.state.getWebSockets().forEach((ws: WebSocket) => {
			if (ws == except) return;
			message.auth = "REDACTED-REDACTED-REDACTED-REDACTED-REDACTED";
			ws.send(JSON.stringify(message));
		});
	}

	async webSocketMessage(ws: WebSocket, message: string) {
		const instruction = <BoardInstruction>JSON.parse(message);
		const ins = this.sessions.get(ws) ?? [];
		ins.push(instruction);
		this.sessions.set(ws, ins);
		this.broadcast(ws, instruction);
	}

	async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {
		ws.send(JSON.stringify({ status: code, message: reason }));
		ws.close(code, reason);
	}
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