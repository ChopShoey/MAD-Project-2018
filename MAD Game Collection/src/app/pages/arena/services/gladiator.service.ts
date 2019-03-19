// Author/s: Lee Shuman
// This service encapsulates the player information logic, so that the application is only
// concerned with what the players name is or if it is set.

import { Injectable } from "@angular/core";
import * as applicationSettingsModule from "application-settings";
import * as trace from "tns-core-modules/trace";
import { traceCategories, traceMessageType } from "tns-core-modules/ui/page/page";
import { Gladiator } from "../shared/gladiator";
import { GladiatorStatistics } from "../shared/gladiatorStatistics";

const gladiatorNameKey: string = "gladiatorName";

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
            console.log("Should be tracing");
            trace.write(`name constant is ${name}`, trace.categories.Debug, trace.messageType.log);
            this.gladiator = new Gladiator(name);

            // Load stats from settings
            trace.write(typeof(this.gladiator.gladiatorStatistics.strength),
                trace.categories.Debug, trace.messageType.info);

            const newStats = new GladiatorStatistics();
            newStats.strength = applicationSettingsModule.getNumber(
                GladiatorStatistics.strengthKey, GladiatorStatistics.baseStatValue);
            newStats.agility = applicationSettingsModule.getNumber(
                GladiatorStatistics.agilityKey, GladiatorStatistics.baseStatValue);
            newStats.defense = applicationSettingsModule.getNumber(
                GladiatorStatistics.defenseKey, GladiatorStatistics.baseStatValue);
            newStats.vitality = applicationSettingsModule.getNumber(
                GladiatorStatistics.vitalityKey, GladiatorStatistics.baseStatValue);
            newStats.endurance = applicationSettingsModule.getNumber(
                GladiatorStatistics.enduranceKey, GladiatorStatistics.baseStatValue);
            this.gladiator.gladiatorStatistics = newStats;

            trace.write(`Created ${this.gladiator.name} with stats:
\tStrength: ${this.gladiator.gladiatorStatistics.strength}
\tAgility: ${this.gladiator.gladiatorStatistics.agility}
\tDefense: ${this.gladiator.gladiatorStatistics.defense}
\tVitality: ${this.gladiator.gladiatorStatistics.vitality}
\tEndurance: ${this.gladiator.gladiatorStatistics.endurance}`,
traceCategories.Debug,
traceMessageType.info);
        } else {
            this.gladiator = new Gladiator(null);
            trace.write(`Created a new gladiator with no name with stats:
\tStrength: ${this.gladiator.gladiatorStatistics.strength}
\tAgility: ${this.gladiator.gladiatorStatistics.agility}
\tDefense: ${this.gladiator.gladiatorStatistics.defense}
\tVitality: ${this.gladiator.gladiatorStatistics.vitality}
\tEndurance: ${this.gladiator.gladiatorStatistics.endurance}`,
traceCategories.Debug,
traceMessageType.info);
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
