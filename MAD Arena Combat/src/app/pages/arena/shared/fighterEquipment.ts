import { Equipment } from "./equipment";

// Author: Lee Shuman

export class FighterEquipment {
    beltEquipment: Equipment;
    legEquipment: Equipment;
    chestEquipment: Equipment;
    helmEquipment: Equipment;
    feetEquipment: Equipment;
    leftHandEquipment: Equipment;
    rightHandEquipment: Equipment;

    getArmorRating(): number {
        return 1; // TODO will need to update to reflect all of the armor
    }

    getWeaponRating(): number {
        return 1; // TODO will need to update to reflect the left/right hand equipment
    }
}
