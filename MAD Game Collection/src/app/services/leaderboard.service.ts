// This service encapsulates the leaderboard request logic, so that the pages are only
// concerned with how to display the news story elements.

import { Injectable } from "@angular/core";
import { getJSON } from "tns-core-modules/http";

@Injectable({
    providedIn: "root"
})
export class LeaderboardService {
    private serverUrl;
    constructor() {
        // Fill in constructor
    }

    getTopTen(gameGuid: string) {
        this.serverUrl = "https://game-collection-leaderboard.glitch.me/api/v1/score";

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
