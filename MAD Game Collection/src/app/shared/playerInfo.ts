// Player class definition based on leaderboard API service

import { throwError } from "rxjs";

const guidRegex = /^X\'[0-9a-fA-F]{32}\'$/;

export class PlayerInfo {
    name: string;
    guid: string;

    constructor(name: string, guid: string) {
        name ? this.name = name : throwError(new Error("Falsey player name"));
        guidRegex.test(guid) ? this.guid = guid : throwError(new Error("GUID did not match GUID regular expression"));
    }
}
