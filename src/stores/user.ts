import { writable } from "svelte/store";

export const userStore = writable({ id: "", username: "" });
