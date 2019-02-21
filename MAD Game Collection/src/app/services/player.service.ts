// Author/s: Lee Shuman
// This service encapsulates the player information logic, so that the application is only
// concerned with what the players name is or if it is set.

import { Injectable } from "@angular/core";
import * as applicationSettingsModule from "application-settings";
import { Guid } from "guid-typescript";
import * as trace from "tns-core-modules/trace";
import { PlayerInfo } from "../shared/playerInfo";

const playerNameSettingKey: string = "playerName";
const playerGuidSettingKey: string = "playerGuid";

@Injectable({
    providedIn: "root"
})
export class PlayerService {
    playerInfo: PlayerInfo;
    guidRegex: RegExp = /^X\'[0-9a-fA-F]{32}\'$/;
    private id: Guid;
    private playerID: string;

    constructor() {
        // See if a player name and id have been stored in settings.
        const applicationSettingPlayerNameString = applicationSettingsModule.getString(playerNameSettingKey, null);
        this.playerID = applicationSettingsModule.getString(playerGuidSettingKey, null);
        // Once per install, playerID should be uninitialized and must be generated
        if (this.playerID === null) {
            const newPlayerGuid = `X'${ Guid.create().toString().replace(/-/g, "")}'`;
            this.playerID = newPlayerGuid;
            applicationSettingsModule.setString(playerGuidSettingKey, this.playerID);
        }
        // As long as the playerInfo is valid, store the playerInfo in the service for retrieval by injectors
        if (applicationSettingPlayerNameString && this.guidRegex.test(this.playerID)) {
            try {
                this.playerInfo = new PlayerInfo(applicationSettingPlayerNameString,
                    this.playerID,
                    this);
            } catch (error) {
                console.log(`Caught: ${error}`);
            }
        }
    }

    // Allows views and application initialization to change behavior based on if playerInfo is available.
    isPlayerNameSet(): boolean {
        return this.playerInfo ? true : false;
    }

    // Currently allows all non-empty strings as names.
    setPlayerName(playerName: string): void {
        if (playerName.trim()) {
            applicationSettingsModule.setString(playerNameSettingKey, playerName);
            try {
                this.playerInfo = new PlayerInfo(playerName, this.playerID, this);
            } catch (error) {
                console.log(`Caught: ${error}`);
            }
        } else {
            trace.error("Tried to set a 'Falsey' player name");
        }
    }
}
