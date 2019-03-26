// Author/s: Lee Shuman
// Player class definition based on leaderboard API service

import * as trace from "tns-core-modules/trace";
import { PlayerService } from "../services/player.service";

export class PlayerInfo {
    name: string;
    guid: string;

    // Imports the playerService so that the GUID can be validated before being set as PlayerInfo
    constructor(name: string, guid: string, playerService: PlayerService) {
        name ? this.name = name : trace.error("Falsey player name");
        if (playerService.guidRegex.test(guid)) {
            this.guid = guid;
        } else {
            trace.error("GUID did not match GUID regular expression");
        }
    }
}
