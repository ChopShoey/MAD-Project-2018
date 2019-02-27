// Author/s: Lee Shuman
// Defines gladiator properties/functions

import * as trace from "tns-core-modules/trace";
import { Equipment } from "./equipment";
import { GladiatorsEquipment } from "./gladiatorsEquipment";
import { GladiatorStatistics } from "./gladiatorStatistic";

export class Gladiator {
    name: string;
    gladiatorStatistics: GladiatorStatistics;
    gladiatorsEquipment: GladiatorsEquipment;

    // Imports the playerService so that the GUID can be validated before being set as PlayerInfo
    constructor(name: string) {
        name === null || name.trim() !== "" ? this.name = name : trace.error("Name cannot be empty");
    }
}
