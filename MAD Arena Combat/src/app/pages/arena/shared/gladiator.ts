// Author/s: Lee Shuman
// Defines gladiator properties/functions

import * as trace from "tns-core-modules/trace";
import { Equipment } from "./equipment";
import { FighterEquipment } from "./fighterEquipment";
import { FighterStatistics } from "./fighterStatistics";
import { IFighter } from "./IFighter";
import { ITarget } from "./ITarget";

export class Gladiator implements IFighter {
    name: string;
    fighterStatistics: FighterStatistics;
    fighterEquipment: FighterEquipment;
    health: number;
    stamina: number;
    armorRating: number;

    // Imports the playerService so that the GUID can be validated before being set as PlayerInfo
    constructor(name: string, fighterStatistics: FighterStatistics = new FighterStatistics()) {
        name === null || name.trim() !== "" ? this.name = name : trace.error("Name cannot be empty");
        this.fighterStatistics = fighterStatistics;
        this.health = this.fighterStatistics.maxHealth;
        this.stamina = this.fighterStatistics.maxStamina;
        this.armorRating = 1;
    }
}
