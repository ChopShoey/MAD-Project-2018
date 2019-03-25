import { EquipmentSlotEnum } from "../equipmentSlotEnum";
import { IAttacker } from "../IAttacker";
import { ITarget } from "../ITarget";
import { IWeapon } from "../IWeapon";

export class Fists implements IWeapon{
    readonly slot: EquipmentSlotEnum = EquipmentSlotEnum.BOTH;
    readonly weaponRating: number = 2;

    Attack(attacker: IAttacker, target: ITarget): number {
        return attacker.gladiatorStatistics.strength * this.weaponRating - target.armorRating;
    }


}