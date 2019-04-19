// Author: Lee Shuman
// Aggregation class for calculating armor/weapon impacts.

import { IEquipment } from "./IEquipment";
import { Fists } from "./weapons/fists";

export class FighterEquipment {
    beltEquipment: IEquipment;
    legEquipment: IEquipment;
    chestEquipment: IEquipment;
    helmEquipment: IEquipment;
    feetEquipment: IEquipment;
    offHandEquipment: IEquipment;
    mainHandEquipment: IEquipment;

    get weight(): number {
        let result = 0;
        this.beltEquipment ? result += this.beltEquipment.weight : result -= 0;
        this.legEquipment ? result += this.legEquipment.weight : result -= 0;
        this.chestEquipment ? result += this.chestEquipment.weight : result -= 0;
        this.helmEquipment ? result += this.helmEquipment.weight : result -= 0;
        this.feetEquipment ? result += this.feetEquipment.weight : result -= 0;
        this.offHandEquipment ? result += this.offHandEquipment.weight : result -= 0;
        this.mainHandEquipment ? result += this.mainHandEquipment.weight : result -= 0;

        return result;
    }

    constructor() {
        this.mainHandEquipment = new Fists();
    }

    getArmorRating(): number {
        return 1; // TODO will need to update to reflect all of the armor
    }

    getWeaponRating(): number {
        return 1; // TODO will need to update to reflect the left/right hand equipment
    }
}
