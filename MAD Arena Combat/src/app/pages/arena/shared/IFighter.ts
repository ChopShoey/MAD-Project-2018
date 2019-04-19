// Author: Lee Shuman
// Contains building blocks that are necessary for a fight in the arena.

import { FighterEquipment } from "./fighterEquipment";
import { FighterStatistics } from "./fighterStatistics";

export interface IFighter {
    name: string;
    fighterStatistics: FighterStatistics;
    fighterEquipment: FighterEquipment;
    currentHealth: number;
    currentStamina: number;
    ticksPerAttack: number;

    Attack(target: IFighter);
}
