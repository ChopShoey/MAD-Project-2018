// Author/s: Lee Shuman
// Defines fighter properties/functions

import * as applicationSettingsModule from "application-settings";
import * as trace from "tns-core-modules/trace";
import { traceCategories, traceMessageType } from "tns-core-modules/ui/page/page";

export class FighterStatistics {

    static readonly strengthKey: string = "FighterStrength";
    static readonly agilityKey: string = "FighterAgility";
    static readonly vitalityKey: string = "FighterVitality";
    static readonly enduranceKey: string = "FighterEndurance";

    static readonly baseStatValue: number = 10;
    static readonly maxStatValue: number = 99;

    private _strength: number;
    get strength(): number {
        return this._strength || FighterStatistics.baseStatValue;
    }
    set strength(v: number) {
        const previousValue = this._strength;
        if (previousValue !== v) {
            this._strength = v;
            // applicationSettingsModule.setNumber(FighterStatistics.strengthKey, this._strength);
            trace.write(`Set strength to ${v}`, traceCategories.Debug, traceMessageType.log);
        } else {
            trace.write(`Strength was not updated because it was already ${previousValue}`,
                traceCategories.Debug, traceMessageType.info);
        }
    }

    private _agility: number;
    get agility(): number {
        return this._agility || FighterStatistics.baseStatValue;
    }
    set agility(v: number) {
        const previousValue = this._agility;
        if (previousValue !== v) {
            this._agility = v;
            // applicationSettingsModule.setNumber(FighterStatistics.agilityKey, this._agility);
            trace.write(`Set agility to ${v}`, traceCategories.Debug, traceMessageType.log);
        } else {
            trace.write(`Agility was not updated because it was already ${previousValue}`,
                traceCategories.Debug, traceMessageType.info);
        }
    }

    private _vitality: number;
    get vitality(): number {
        return this._vitality || FighterStatistics.baseStatValue;
    }
    set vitality(v: number) {
        const previousValue = this._vitality;
        if (previousValue !== v) {
            this._vitality = v;
            // applicationSettingsModule.setNumber(FighterStatistics.vitalityKey, this._vitality);
            trace.write(`Set vitality to ${v}`, traceCategories.Debug, traceMessageType.log);
        } else {
            trace.write(`Vitality was not updated because it was already ${previousValue}`,
                traceCategories.Debug, traceMessageType.info);
        }
    }

    private _endurance: number;
    get endurance(): number {
        return this._endurance || FighterStatistics.baseStatValue;
    }
    set endurance(v: number) {
        const previousValue = this._endurance;
        if (previousValue !== v) {
            this._endurance = v;
            // applicationSettingsModule.setNumber(FighterStatistics.enduranceKey, this._endurance);
            trace.write(`Set endurance to ${v}`, traceCategories.Debug, traceMessageType.log);
        } else {
            trace.write(`Endurance was not updated because it was already ${previousValue}`,
                traceCategories.Debug, traceMessageType.info);
        }
    }

    get maxHealth(): number {
        return (2 * this.vitality + this.agility) * 4;
    }

    get maxStamina(): number {
        return (2 * this.endurance + this.strength) * 4;
    }

    constructor() {
        //
    }
}
