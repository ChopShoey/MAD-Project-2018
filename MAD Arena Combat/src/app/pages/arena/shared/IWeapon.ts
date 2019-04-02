import { EquipmentSlotEnum } from "./equipmentSlotEnum";
import { IFighter } from "./IFighter";

export interface IWeapon {
    readonly slot: EquipmentSlotEnum;
    weaponRating: number;

    Attack(attacker: IFighter, target: IFighter);
}
