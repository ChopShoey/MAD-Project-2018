// Author/s: Lee Shuman
// Defines gladiator properties/functions

import * as trace from "tns-core-modules/trace";
import { EquipmentSlotEnum } from "./equipmentSlotEnum";

export interface IEquipment {

    slot: EquipmentSlotEnum;
    isWeapon: boolean;
    isShield: boolean;
    weight: number;
}
