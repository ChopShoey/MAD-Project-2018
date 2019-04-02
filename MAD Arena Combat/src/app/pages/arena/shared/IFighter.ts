import { FighterEquipment } from "./fighterEquipment";
import { FighterStatistics } from "./fighterStatistics";

export interface IFighter {
    name: string;
    fighterStatistics: FighterStatistics;
    fighterEquipment: FighterEquipment;
    health: number;
    armorRating: number;
}
