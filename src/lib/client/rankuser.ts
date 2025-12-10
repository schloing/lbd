export interface RankUser {
    name: string;
    username?: string; // cached username from uuid in users
    uuid?: string; // only valid if accountAssociated
    score: number;
    accountAssociated: boolean;
};