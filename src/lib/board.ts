import type { UUID } from 'node:crypto';

export enum BoardOperation {
    AddScore = 'AddScore',
    RemoveScore = 'RemoveScore',
    ResetBoard = 'ResetBoard',
}

export interface BoardInstruction<T = unknown[]> {
    auth: UUID, // table.Session.id
    user: UUID, // table.Session.user
    board: UUID, // table.Board.id
    operation: BoardOperation,
    args: T,
}