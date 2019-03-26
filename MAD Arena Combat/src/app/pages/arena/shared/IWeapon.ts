import { EquipmentSlotEnum } from "./equipmentSlotEnum";
import { IAttacker } from "./IAttacker";
import { ITarget } from "./ITarget";

export interface IWeapon {
    readonly slot: EquipmentSlotEnum;
    weaponRating: number;

    Attack(attacker: IAttacker, target: ITarget);
}
