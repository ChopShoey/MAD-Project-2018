// Author: Lee Shuman
// Used to modify attack behavior when no weapons are equipped.

import { EquipmentSlotEnum } from "~/app/pages/arena/shared/equipmentSlotEnum";
import { IEquipment } from "~/app/pages/arena/shared/IEquipment";

export class Fists implements IEquipment {
    readonly slot: EquipmentSlotEnum = EquipmentSlotEnum.BOTH;
    readonly weaponRating: number = 2;
    readonly isWeapon: boolean = true;
    readonly isShield: boolean = false;
    readonly weight: number = 0;
}
