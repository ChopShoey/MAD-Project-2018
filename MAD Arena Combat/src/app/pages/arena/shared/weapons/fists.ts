import { EquipmentSlotEnum } from "../equipmentSlotEnum";
import { IFighter } from "../IFighter";
import { IWeapon } from "../IWeapon";

export class Fists implements IWeapon{
    readonly slot: EquipmentSlotEnum = EquipmentSlotEnum.BOTH;
    readonly weaponRating: number = 2;

    Attack(attacker: IFighter, target: IFighter): number {
        return attacker.fighterStatistics.strength * this.weaponRating - target.armorRating;
    }


}