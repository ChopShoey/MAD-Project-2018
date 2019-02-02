//  Author/s: Lee Shuman
// This service encapsulates the leaderboard request logic, so that the pages are only
// concerned with how to display the leaderboard elements.

import { Injectable } from "@angular/core";
import * as httpModule from "tns-core-modules/http";
import * as trace from "tns-core-modules/trace";
import { LeaderboardEntry } from "../shared/leaderboardEntry";

@Injectable({
    providedIn: "root"
})
export class LeaderboardService {

    leaderboardEntries: Array<LeaderboardEntry>;
    constructor() {
        // Used for injecting other modules, if necessary
    }

    requestTopTen(gameGuid: string): void {
        this.leaderboardEntries = [];
        const serverURL = "https://game-collection-leaderboard.glitch.me/api/v1/score?game_id=" + gameGuid.toString();
        httpModule.getJSON({
            url: serverURL,
            method: "GET"
        }).then((results: any) => {
            results.forEach((result) => {
                const leaderboardEntry: LeaderboardEntry = {
                    name: result.name,
                    score: result.score
                };
                this.leaderboardEntries.push(leaderboardEntry);
            });
        }, (error) => {
            trace.error(error);
        });
    }
}
