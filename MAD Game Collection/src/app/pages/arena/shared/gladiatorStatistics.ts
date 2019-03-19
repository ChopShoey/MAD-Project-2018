// Author/s: Lee Shuman
// Defines gladiator properties/functions

import * as applicationSettingsModule from "application-settings";
import * as trace from "tns-core-modules/trace";

export class GladiatorStatistics {

    static readonly strengthKey: string = "GladiatorStrength";
    static readonly agilityKey: string = "GladiatorAgility";
    static readonly defenseKey: string = "GladiatorDefense";
    static readonly vitalityKey: string = "GladiatorVitality";
    static readonly enduranceKey: string = "GladiatorEndurance";

    static readonly baseStatValue: number = 10;

    private _strength: number;
    get strength(): number {
        return this._strength || GladiatorStatistics.baseStatValue;
    }
    set strength(v: number) {
        this._strength = v;
        applicationSettingsModule.setNumber(GladiatorStatistics.strengthKey, this._strength);
    }

    private _agility: number;
    get agility(): number {
        return this._agility || GladiatorStatistics.baseStatValue;
    }
    set agility(v: number) {
        this._agility = v;
        applicationSettingsModule.setNumber(GladiatorStatistics.agilityKey, this._agility);
    }

    private _defense: number;
    get defense(): number {
        return this._defense || GladiatorStatistics.baseStatValue;
    }
    set defense(v: number) {
        this._defense = v;
        applicationSettingsModule.setNumber(GladiatorStatistics.defenseKey, this._defense);
    }

    private _vitality: number;
    get vitality(): number {
        return this._vitality || GladiatorStatistics.baseStatValue;
    }
    set vitality(v: number) {
        this._vitality = v;
        applicationSettingsModule.setNumber(GladiatorStatistics.vitalityKey, this._vitality);
    }

    private _endurance: number;
    get endurance(): number {
        return this._endurance || GladiatorStatistics.baseStatValue;
    }
    set endurance(v: number) {
        this._endurance = v;
        applicationSettingsModule.setNumber(GladiatorStatistics.enduranceKey, this._endurance);
    }

    constructor() {
        //
    }
}
