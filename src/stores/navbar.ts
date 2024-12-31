import { type Component } from 'svelte';
import { writable } from 'svelte/store';

export const NavbarBoardInfo = writable<Component | undefined>(undefined);
export default NavbarBoardInfo;