import { EquipmentSlotEnum } from "../equipmentSlotEnum";
import { IEquipment } from "../IEquipment";
import { IFighter } from "../IFighter";

export class Fists implements IEquipment {
    readonly slot: EquipmentSlotEnum = EquipmentSlotEnum.BOTH;
    readonly weaponRating: number = 2;
    readonly isWeapon: boolean = true;
    readonly isShield: boolean = false;
    readonly weight: number = 0;
}
