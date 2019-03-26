// Author/s: Lee Shuman
// Defines gladiator properties/functions

import * as trace from "tns-core-modules/trace";
import { Equipment } from "./equipment";
import { GladiatorsEquipment } from "./gladiatorsEquipment";
import { GladiatorStatistics } from "./gladiatorStatistics";

export class Gladiator {
    name: string;
    gladiatorStatistics: GladiatorStatistics;
    gladiatorsEquipment: GladiatorsEquipment;

    // Imports the playerService so that the GUID can be validated before being set as PlayerInfo
    constructor(name: string, gladiatorStatistics: GladiatorStatistics = new GladiatorStatistics()) {
        name === null || name.trim() !== "" ? this.name = name : trace.error("Name cannot be empty");
        this.gladiatorStatistics = gladiatorStatistics;
    }
}
