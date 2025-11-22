// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Session, User } from "better-auth";

declare global {
	namespace App {
		interface Platform {
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}

		interface Locals {
			user: User & { username: string };
			session: Session;
		}
	}
}

export { };
