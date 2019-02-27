// Author/s: Lee Shuman
// This service encapsulates the player information logic, so that the application is only
// concerned with what the players name is or if it is set.

import { Injectable } from "@angular/core";
import * as applicationSettingsModule from "application-settings";
import { Guid } from "guid-typescript";
import * as httpModule from "http";
import * as trace from "tns-core-modules/trace";
import { Gladiator } from "../shared/gladiator";

const gladiatorNameKey: string = "gladiatorName";
const gladiatorStrengthKey: string = "gladiatorStrength";

@Injectable({
    providedIn: "root"
})
export class GladiatorService {
    gladiator: Gladiator;

    constructor() {
        // See if a gladiator name has been stored in settings
        if (applicationSettingsModule.hasKey(gladiatorNameKey) &&
            applicationSettingsModule.hasKey(gladiatorStrengthKey)) {
                const name = applicationSettingsModule.getString(gladiatorNameKey);
                const strength = applicationSettingsModule.getNumber(gladiatorStrengthKey);
            } else {
                this.gladiator = new Gladiator("placeholder");
            }
    }

    private setGladiatorName(value: string) {
        this.gladiator.name = value.trim();
    }
}
