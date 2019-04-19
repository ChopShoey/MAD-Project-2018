// Author: Lee Shuman
// Defines gladiator properties/functions

import { EquipmentSlotEnum } from "./equipmentSlotEnum";

export interface IEquipment {

    slot: EquipmentSlotEnum;
    isWeapon: boolean;
    isShield: boolean;
    weight: number;
}
