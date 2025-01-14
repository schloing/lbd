import type { UUID } from 'node:crypto';

export enum BoardMessageType {
    ConnectionInit = 'ConnectionInit',
    BoardInstruction = 'BoardInstruction',
    RequestCommit = 'RequestCommit',
    UncommittedArray = 'UncommittedArray',
}

export type UncommittedArray = BoardInstruction[];

export interface BoardMessage {
    message: BoardInstruction | ConnectionInit | UncommittedArray,
    type: BoardMessageType
}

export interface ConnectionInit {
    auth: UUID,
    user: UUID,
    board: UUID,
}

export enum BoardOperation {
    AddPlayer = 'AddPlayer',
    RemovePlayer = 'RemovePlayer',
    UpdateScore = 'UpdateScore',
    ResetBoard = 'ResetBoard',
}

export interface BoardInstruction<T = unknown[]> {
    operation: BoardOperation,
    args: T,
}