import { DurableObject } from "cloudflare:workers";
import { BoardMessage, BoardInstruction, BoardMessageType, ConnectionInit } from "../../../src/lib/board";
import { UUID } from 'node:crypto';

export class Connections extends DurableObject<Env> {
	sessions: Map<UUID, BoardInstruction[]>;
	state: DurableObjectState;

	constructor(state: DurableObjectState, env: Env) {
		super(state, env);
		this.sessions = new Map();
		this.state = state;

		state.getWebSockets().forEach((ws) => {
			const meta = ws.deserializeAttachment();
			this.sessions.set(meta.board, []);
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
		const meta = ws.deserializeAttachment();
		ws.serializeAttachment({ ...meta });
	}

	private async broadcast(except: WebSocket | null, message: BoardInstruction) {
		this.state.getWebSockets().forEach((ws: WebSocket) => {
			if (ws == except) return;
			
			const _this = except?.deserializeAttachment();
			const _that = ws.deserializeAttachment();

			if (!(_this && _that) || !(_this.board && _that.board)) return;

			if (_this.board == _that.board)
				ws.send(JSON.stringify(message));
		});
	}

	private async commit(ws: WebSocket) {
		const command = this.env.DB.prepare("");
		await command.run(); 
	}

	async webSocketMessage(ws: WebSocket, message: string) {
		const deserialized = <BoardMessage>JSON.parse(message);

		switch (deserialized.type) {
			case BoardMessageType.ConnectionInit: {
				const board = (<ConnectionInit>deserialized.message).board;
				ws.serializeAttachment({ board: board });
				const uncommitted = this.sessions.get(board) ?? [];
				ws.send(JSON.stringify({ uncommitted: uncommitted }));
				break;
			}

			case BoardMessageType.BoardInstruction: {
				const instruction = <BoardInstruction>deserialized.message;
				const meta = ws.deserializeAttachment();
				if (!meta) return;
				const uncommitted = this.sessions.get(meta.board) ?? [];
				uncommitted.push(instruction);
				this.sessions.set(meta.board, uncommitted);
				this.broadcast(ws, <BoardInstruction>deserialized.message);
				break;
			}

			case BoardMessageType.RequestCommit: {
				this.commit(ws);
				// if an authenticated socket sends this
				// then apply all their instructions to the d1 board
				// automatically do this every now and then
			}
		}
	}

	async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {
		ws.send(JSON.stringify({ status: code, message: reason }));
		this.commit(ws);
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