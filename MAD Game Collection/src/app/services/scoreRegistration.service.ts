// Author/s: Lee Shuman
// This service encapsulates the score registration logic, so that consumers can
// post scores to their respective leaderboards.

import { Injectable } from "@angular/core";
import * as httpModule from "http";
import * as trace from "tns-core-modules/trace";
import { GameIDService } from "./gameID.service";
import { PlayerService } from "./player.service";
import { traceCategories, traceMessageType } from "tns-core-modules/ui/page/page";

const validScoreRegex = /^[0-9]{1,9}$/;

@Injectable({
    providedIn: "root"
})
export class ScoreRegistrationService {

    constructor(private playerService: PlayerService, private gameIDService: GameIDService) {
        // Used to import other needed services
    }

    postScore(score: number, gameID: string): void {
        if (validScoreRegex.test(score.toString()) && this.gameIDService.guidRegex.test(gameID)) {
            const serverURL = "https://game-collection-leaderboard.glitch.me/api/v1/score?player_id=" +
            this.playerService.playerInfo.guid + "&game_id=" + gameID + "&score=" + score;
            trace.write(`Posting to ${serverURL}`, traceCategories.Debug, traceMessageType.log);

            httpModule.request({
                url: serverURL,
                method: "POST"
            }).then((response: httpModule.HttpResponse) => {
                const jsonResponse = response.content.toJSON();
                if (jsonResponse.message === "An error occurred") {
                    trace.error("Score did not post");
                }
            }, (e) => {
                trace.error(e);
            });
        } else {
            trace.error("Score parameter tests failed");
        }
    }
}
