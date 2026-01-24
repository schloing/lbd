export interface RankUser {
    name: string;
    username?: string; // cached username from uuid in users
    uuid?: string; // only valid if accountAssociated
    board: string;
    accountAssociated: boolean;
};

export interface ScoreUser {
    user: RankUser;
    score: number;
};