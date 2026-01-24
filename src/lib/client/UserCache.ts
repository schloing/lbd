import type { RankUser } from "./RankUser";
import { getUserById } from "./user.remote";

class UserCache {
    map: Map<string, RankUser>;

    constructor() {
        this.map = new Map<string, RankUser>();
    }

    async get(uuid: string) {
        if (this.map.has(uuid)) {
            return this.map.get(uuid) ?? null;
        }

        const queryUser = await getUserById(uuid);

        if (!queryUser) {
            return null;
        }

        const user = { ...queryUser, accountAssociated: true } as RankUser; // score irrelevant
        this.map.set(uuid, user);

        return user;
    }
};

export const userCache = new UserCache();