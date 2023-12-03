import { writable } from "svelte/store";

export class GameValues {
    players = [];
    locations = [];
    time = 300;
    spy = 0;
    location = "";
    phase = "prepregame";
    app = null;
    constructor(appInstance) {
        this.app = appInstance;
    }
}

export const gameStore = writable(new GameValues());