import { DurableObject } from "cloudflare:workers";
import { BoardMessage, BoardInstruction, BoardMessageType, ConnectionInit, BoardOperation } from "../../../src/lib/board";
import { randomUUID, UUID } from 'node:crypto';

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
            // if (ws == except) return;

            const _this = except?.deserializeAttachment();
            const _that = ws.deserializeAttachment();

            if (!(_this && _that) || !(_this.board && _that.board)) return;

            if (_this.board == _that.board)
                ws.send(JSON.stringify(<BoardMessage>{ message: message, type: BoardMessageType.BoardInstruction }));
        });
    }

    private async commit(ws: WebSocket) {
        const meta = ws.deserializeAttachment();
        if (!meta) return Error("no meta attached to websocket");
        const instructions = this.sessions.get(meta);
        if (!instructions) return Error("no instructions");

        const deleteOldRankings = this.env.DB.prepare(`DELETE * FROM rankings WHERE id = ?`).bind(meta.board);
        await deleteOldRankings.run();

        try {
            for (let i = 0; i < (instructions ?? []).length; i++) {
                const ranking = instructions[i];
                const user = ranking.args[0];
                if (!user) continue;
                let command;

                switch (ranking.operation) {
                    case BoardOperation.AddPlayer: {
                        const init = ranking.args[1];
                        if (!init) return;
                        command = this.env.DB.prepare(`INSERT INTO rankings VALUES (?, ?, ?, ?)`);
                        await command.bind(randomUUID(), meta.board, user, init).run();
                        break;
                    }

                    case BoardOperation.UpdateScore: {
                        const update = ranking.args[1];
                        if (!update) return;
                        command = this.env.DB.prepare(`UPDATE rankings SET score = ? WHERE board = ? AND user = ?`);
                        await command.bind(update, meta.board, user).run();
                        break;
                    }

                    case BoardOperation.RemovePlayer: {
                        command = this.env.DB.prepare(`DELETE FROM rankings WHERE board = ? AND user = ?`);
                        await command.bind(meta.board, user).run();
                        break;
                    }

                    default:
                        console.warn(`unimplemented operation? ${ranking.operation}`);
                }
            }
        } catch (e) {
            console.error(e);
            return e;
        }
    }

    async webSocketMessage(ws: WebSocket, message: string) {
        const deserialized = <BoardMessage>JSON.parse(message);

        switch (deserialized.type) {
            case BoardMessageType.ConnectionInit: {
                const board = (<ConnectionInit>deserialized.message).board;
                ws.serializeAttachment({ board: board });
                const uncommitted = this.sessions.get(board) ?? [];
                ws.send(JSON.stringify(<BoardMessage>{ message: uncommitted, type: BoardMessageType.UncommittedArray }));
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
        try {
            this.commit(ws);
        } catch (e) {
            console.error(e);
        }
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