// Author: Lee Shuman
// Simple weapon rating interface

import { EquipmentSlotEnum } from "./equipmentSlotEnum";
import { IFighter } from "./IFighter";

export interface IWeapon {
    readonly slot: EquipmentSlotEnum;
    weaponRating: number;
}
