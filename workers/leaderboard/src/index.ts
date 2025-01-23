import { DurableObject } from "cloudflare:workers";
import { BoardMessageType, BoardOperation, Instruction } from "../../../src/lib/board";
import { randomUUID, UUID } from 'node:crypto';

export class Connections extends DurableObject<Env> {
    state: DurableObjectState;
    sql: SqlStorage;

    constructor(state: DurableObjectState, env: Env) {
        super(state, env);
        this.state = state;
        this.sql = this.ctx.storage.sql;

        this.sql.exec(`CREATE TABLE IF NOT EXISTS instructions (
            type        TEXT,
            board       TEXT,
            user        TEXT,
            uponUser    TEXT,
            intial      INTEGER
          );`);
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

    private async broadcast(except: WebSocket | null, message: string) {
        this.state.getWebSockets().forEach((ws: WebSocket) => {
            // if (ws == except) return;

            const _this = except?.deserializeAttachment();
            const _that = ws.deserializeAttachment();

            if (!(_this && _that) || !(_this.board && _that.board)) return;

            if (_this.board == _that.board)
                ws.send(message);
        });
    }

    private async commit(ws: WebSocket) {
        const meta = ws.deserializeAttachment();
        if (!meta) return Error("no meta attached to websocket");
        const instructions = this.sql.exec("SELECT * FROM instructions").toArray() as unknown as Instruction[];

        try {
            let command;

            for (let i = 0; i < instructions.length; i++) {
                const instruction = instructions[i];

                switch (instruction.operation) {
                    case BoardOperation.AddPlayer:
                        command = this.env.DB.prepare(`INSERT INTO rankings VALUES (?, ?, ?, ?)`);
                        await command.bind(randomUUID(), meta.board, instruction.user, instruction.initial).run();
                        break;

                    case BoardOperation.RemovePlayer:
                        command = this.env.DB.prepare(`DELETE FROM rankings WHERE board = ? AND user = ?`);
                        await command.bind(meta.board, instruction.user).run();
                        break;

                    case BoardOperation.UpdateScore:
                        command = this.env.DB.prepare(`UPDATE rankings SET score = ? WHERE board = ? AND user = ?`);
                        await command.bind(instruction.initial, meta.board, instruction.user).run();
                        break;

                    default:
                        console.error("unimplemented operation", instruction.operation);
                        break;
                }
            };
        } catch (e) {
            console.error(e);
            return e;
        }
    }

    async webSocketMessage(ws: WebSocket, message: string) {
        const deserialized = JSON.parse(message) as Instruction;

        switch (deserialized.type) {
            case BoardMessageType.ConnectionInit: {
                const board = deserialized.board;
                ws.serializeAttachment({ board: board });
                ws.send(message);
                break;
            }

            case BoardMessageType.BoardInstruction: {
                const meta = ws.deserializeAttachment();
                if (!meta) return;
                this.broadcast(ws, message);
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