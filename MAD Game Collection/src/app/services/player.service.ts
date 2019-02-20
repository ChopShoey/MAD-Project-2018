import { Injectable } from "@angular/core";
import * as applicationSettingsModule from "application-settings";
import { PlayerInfo } from "../shared/playerInfo";

@Injectable({
    providedIn: "root"
})
export class PlayerService {
    playerInfo: PlayerInfo;

    constructor() {
        const applicationSettingPlayerNameString = applicationSettingsModule.getString("playerName", null);
        if (applicationSettingPlayerNameString) {
            this.playerInfo = new PlayerInfo(applicationSettingPlayerNameString, "X'132'");
        }
        console.log(this.isPlayerNameSet());
    }

    isPlayerNameSet(): boolean {
        return this.playerInfo ? true : false;
    }
}
