import { DurableObject } from "cloudflare:workers";
import { SortedMap } from './SortedMap';
// SortedMap and SortedArray from https://github.com/bacali95/sweet-collections

export class LeaderboardInstance {
    async fetch(request: Request, env: Env) {
        return new Response("Hello World");
    }
}
