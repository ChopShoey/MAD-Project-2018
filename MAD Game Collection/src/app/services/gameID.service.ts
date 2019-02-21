// Author/s: Lee Shuman
// This service encapsulates the game information logic, so that the application is only
// concerned with what the game name/ID is.

import { Injectable } from "@angular/core";
import * as trace from "tns-core-modules/trace";
import { GamesEnum } from "../shared/gamesEnum";

@Injectable({
    providedIn: "root"
})
export class GameIDService {
    guidRegex: RegExp = /^X\'[0-9a-fA-F]{32}\'$/;
    private angryCatsGuid = "X'61ce6bd0ae5640748333e65487794234'";
    private gladiatorCombatGuid = "X'4da23fa35cda4e69aad6019823ae77b2'";
    private sudokuGuid = "X'5662c1b042604cad91472619f1e19801'";

    // Currently allows all non-empty strings as names.
    getGameGuid(gameEnumValue: GamesEnum): string {
        switch (gameEnumValue) {
            case GamesEnum.ANGRY_CATS:
                return this.angryCatsGuid;
            case GamesEnum.GLADIATOR_COMBAT:
                return this.gladiatorCombatGuid;
            case GamesEnum.SUDOKU:
                return this.sudokuGuid;
            default:
              trace.error("Did not provide a valid game enum");
          }
    }

    getGameDisplayName(gameEnumValue: GamesEnum): string {
        switch (gameEnumValue) {
            case GamesEnum.ANGRY_CATS:
                return "Angry Cats";
            case GamesEnum.GLADIATOR_COMBAT:
                return "Gladiator Combat";
            case GamesEnum.SUDOKU:
                return "Sudoku";
            default:
              trace.error("Did not provide a valid game enum");
          }
    }
}
