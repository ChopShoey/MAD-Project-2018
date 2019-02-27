// Author/s: Lee Shuman
// This service encapsulates the player information logic, so that the application is only
// concerned with what the players name is or if it is set.

import { Injectable } from "@angular/core";
import * as applicationSettingsModule from "application-settings";
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
        if (applicationSettingsModule.hasKey(gladiatorNameKey)) {
                // Load up the gladiator properties from settings
                const name = applicationSettingsModule.getString(gladiatorNameKey);
                // const strength = applicationSettingsModule.getNumber(gladiatorStrengthKey);
                trace.write(`name constant is ${name}`, trace.categories.Debug, trace.messageType.log);
                this.gladiator = new Gladiator(name);
            } else {
                this.gladiator = new Gladiator(null);
            }
        console.log(`Initialized gladiator as ${this.gladiator.name}`);
    }

    setGladiatorName(proposedName: string) {
        // parameter may be null, so catch/rethrow this invalid parameter
        try {
            // Remove possible leading/trailing whitespace
            const newName = proposedName.trim();
            // If newName is falsey then it can throw as well
            newName ? this.gladiator.name = newName : trace.error("Gladiator name cannot be falsey");
            console.log(`Gladiator name is now ${this.gladiator.name}`);
            applicationSettingsModule.setString(gladiatorNameKey, this.gladiator.name);
            console.log(`Saved gladiator name as ${applicationSettingsModule.getString(gladiatorNameKey)}`);
        } catch (error) {
            // Don't handle broad exceptions here
            trace.error(error);
        }
    }
}
