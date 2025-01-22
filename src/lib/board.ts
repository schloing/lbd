import type { UUID } from 'node:crypto';

export enum BoardMessageType {
    ConnectionInit = 'ConnectionInit',
    BoardInstruction = 'BoardInstruction',
    RequestCommit = 'RequestCommit',
    UncommittedArray = 'UncommittedArray',
}

export enum BoardOperation {
    AddPlayer = 'AddPlayer',
    RemovePlayer = 'RemovePlayer',
    UpdateScore = 'UpdateScore',
    ResetBoard = 'ResetBoard',
}

export interface Instruction {
    type: BoardMessageType,
    operation: BoardOperation,
    board: UUID,
    user: UUID,
    uponUser: UUID,
    intial: number,
}