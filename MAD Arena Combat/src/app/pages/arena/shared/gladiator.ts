// Author: Lee Shuman
// Defines gladiator properties/functions

import * as trace from "tns-core-modules/trace";
import { traceCategories, traceMessageType } from "tns-core-modules/ui/page/page";
import { FighterEquipment } from "./fighterEquipment";
import { FighterStatistics } from "./fighterStatistics";
import { IFighter } from "./IFighter";

const damagePenaltyFactor: number = 0.7;

export class Gladiator implements IFighter {
    currentHealth: number;
    currentStamina: number;

    // Get only property to retrieve a measure of speed. Lower is better.
    get ticksPerAttack(): number {
        return 200 / (this.fighterStatistics.agility -
            Math.round(this.fighterEquipment.weight / this.fighterStatistics.strength));
    }

    // Imports the playerService so that the GUID can be validated before being set as PlayerInfo
    constructor(public name: string,
                public fighterStatistics: FighterStatistics = new FighterStatistics(),
                public fighterEquipment: FighterEquipment = new FighterEquipment()) {
        name === null || name.trim() !== "" ? this.name = name : trace.error("Name cannot be empty");
        this.currentHealth = this.fighterStatistics.maxHealth;
        this.currentStamina = this.fighterStatistics.maxStamina;
    }

    Attack(target: IFighter) {
        // Wellness is a factor of health and energy, where 1 is totally healthy and 0 is dead.
        const wellnessFactor = (this.currentHealth / this.fighterStatistics.maxHealth +
            this.currentStamina / this.fighterStatistics.maxStamina) / 2;

        // The cost to stamina increases as the fighter gets hurt/tired.
        const hitCost = Math.round(this.fighterStatistics.strength * (1 + wellnessFactor) / 2);

        if (hitCost <= this.currentStamina) {
            // You don't hit as hard when you are hurt/tired.
            const damage = Math.round(this.fighterEquipment.getWeaponRating() *
                this.fighterStatistics.strength * (2 + wellnessFactor) / 3);
            target.currentHealth -= damage;
            this.currentStamina -= hitCost;

            // tslint:disable-next-line: max-line-length
            trace.write(`${this.name} attacked ${target.name} for ${damage} damage at ${hitCost} stamina. Stamina is now ${this.currentStamina}`,
                traceCategories.Debug, traceMessageType.info);
        } else {
            // Standard damage is lowered by damage penalty
            let damage = Math.round(this.fighterEquipment.getWeaponRating() *
                this.fighterStatistics.strength * wellnessFactor * damagePenaltyFactor);
            damage < 1 ? damage = 1 : damage = damage;
            target.currentHealth -= damage;

            // Subtract health in place of stamina, but do not kill attacker.
            // Cost is decreased due to decreased hit power.
            let healthCost = Math.round((hitCost - this.currentStamina) * damagePenaltyFactor);
            healthCost > damage ? healthCost = damage : healthCost = healthCost;
            this.currentHealth -= healthCost;

            // Make sure stamina is gone after it has been spent.
            this.currentStamina = 0;

            // tslint:disable-next-line: max-line-length
            trace.write(`${this.name} attacked ${target.name} for ${damage} damage at ${healthCost} health. ${this.name} ${this.currentHealth > 0 ? "did not die." : "died"}`,
                traceCategories.Debug, traceMessageType.info);
        }
    }
}
