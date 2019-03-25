// Author/s: Lee Shuman
// Defines gladiator properties/functions

import * as applicationSettingsModule from "application-settings";
import * as trace from "tns-core-modules/trace";
import { traceCategories, traceMessageType } from "tns-core-modules/ui/page/page";

export class GladiatorStatistics {

    static readonly strengthKey: string = "GladiatorStrength";
    static readonly agilityKey: string = "GladiatorAgility";
    static readonly defenseKey: string = "GladiatorDefense";
    static readonly vitalityKey: string = "GladiatorVitality";
    static readonly enduranceKey: string = "GladiatorEndurance";

    static readonly baseStatValue: number = 10;
    static readonly maxStatValue: number = 99;

    private _strength: number;
    get strength(): number {
        return this._strength || GladiatorStatistics.baseStatValue;
    }
    set strength(v: number) {
        const previousValue = this._strength;
        const newValue = this.forceToRange(v);
        if (previousValue !== newValue) {
            this._strength = newValue;
            applicationSettingsModule.setNumber(GladiatorStatistics.strengthKey, this._strength);
            trace.write(`Set strength to ${newValue}`, traceCategories.Debug, traceMessageType.log);
        } else {
            trace.write(`Strength was not updated because it was already ${previousValue}`,
                traceCategories.Debug, traceMessageType.info);
        }
    }

    private _agility: number;
    get agility(): number {
        return this._agility || GladiatorStatistics.baseStatValue;
    }
    set agility(v: number) {
        const previousValue = this._agility;
        const newValue = this.forceToRange(v);
        if (previousValue !== newValue) {
            this._agility = newValue;
            applicationSettingsModule.setNumber(GladiatorStatistics.agilityKey, this._agility);
            trace.write(`Set agility to ${newValue}`, traceCategories.Debug, traceMessageType.log);
        } else {
            trace.write(`Agility was not updated because it was already ${previousValue}`,
                traceCategories.Debug, traceMessageType.info);
        }
    }

    private _defense: number;
    get defense(): number {
        return this._defense || GladiatorStatistics.baseStatValue;
    }
    set defense(v: number) {
        const previousValue = this._defense;
        const newValue = this.forceToRange(v);
        if (previousValue !== newValue) {
            this._defense = newValue;
            applicationSettingsModule.setNumber(GladiatorStatistics.defenseKey, this._defense);
            trace.write(`Set defense to ${newValue}`, traceCategories.Debug, traceMessageType.log);
        } else {
            trace.write(`Defense was not updated because it was already ${previousValue}`,
                traceCategories.Debug, traceMessageType.info);
        }
    }

    private _vitality: number;
    get vitality(): number {
        return this._vitality || GladiatorStatistics.baseStatValue;
    }
    set vitality(v: number) {
        const previousValue = this._vitality;
        const newValue = this.forceToRange(v);
        if (previousValue !== newValue) {
            this._vitality = newValue;
            applicationSettingsModule.setNumber(GladiatorStatistics.vitalityKey, this._vitality);
            trace.write(`Set vitality to ${newValue}`, traceCategories.Debug, traceMessageType.log);
        } else {
            trace.write(`Vitality was not updated because it was already ${previousValue}`,
                traceCategories.Debug, traceMessageType.info);
        }
    }

    private _endurance: number;
    get endurance(): number {
        return this._endurance || GladiatorStatistics.baseStatValue;
    }
    set endurance(v: number) {
        const previousValue = this._endurance;
        const newValue = this.forceToRange(v);
        if (previousValue !== newValue) {
            this._endurance = newValue;
            applicationSettingsModule.setNumber(GladiatorStatistics.enduranceKey, this._endurance);
            trace.write(`Set endurance to ${newValue}`, traceCategories.Debug, traceMessageType.log);
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

    forceToRange(setValue: number): number {
        return setValue <= GladiatorStatistics.maxStatValue ?
            (setValue >= GladiatorStatistics.baseStatValue ? setValue : GladiatorStatistics.baseStatValue) :
            GladiatorStatistics.maxStatValue;
    }
}
