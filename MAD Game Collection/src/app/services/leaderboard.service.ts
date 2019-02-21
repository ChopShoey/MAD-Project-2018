//  Author/s: Lee Shuman
// This service encapsulates the leaderboard request logic, so that the pages are only
// concerned with how to display the leaderboard elements.

import { Injectable } from "@angular/core";
import { getJSON } from "tns-core-modules/http";

@Injectable({
    providedIn: "root"
})
export class LeaderboardService {
    private serverUrl;

    constructor() {
        // Used for injecting other modules, if necessary
    }

    getTopTen(gameGuid: string) {
        this.serverUrl = "https://game-collection-leaderboard.glitch.me/api/v1/score";
        // Need to add body elements to the request before I can actually request scores.
        getJSON(this.serverUrl).then((r: any) => {
            r.scores.forEach((score) => {
                const scoreValue: string = score.value;
                // Do something with score list
            });
        }, (e) => {
            console.log(e);
        });

        return "NotSetUp";
    }
}
