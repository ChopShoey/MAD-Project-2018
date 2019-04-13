// Author: Lee Shuman

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as trace from "tns-core-modules/trace";
import { Image } from "tns-core-modules/ui/image";
import { EventData, traceCategories, traceMessageType } from "tns-core-modules/ui/page/page";
import { TextField } from "tns-core-modules/ui/text-field/text-field";

import { GladiatorService } from "~/app/pages/arena/services/gladiator.service";
import { FighterStatistics } from "~/app/pages/arena/shared/fighterStatistics";
import { Gladiator } from "~/app/pages/arena/shared/gladiator";
import { IFighter } from "~/app/pages/arena/shared/IFighter";
import { GameIDService } from "~/app/services/gameID.service";
import { ScoreRegistrationService } from "~/app/services/scoreRegistration.service";

@Component({
    selector: "Arena",
    moduleId: module.id,
    templateUrl: "./arena.component.html"
})
export class ArenaComponent implements OnInit {
    private readonly sebastionImage: Image = new Image();
    private readonly lissomeImage: Image = new Image();

    private battleScore: number = 0;
    private scoreTextField: TextField;
    private enemy: IFighter;
    private player: IFighter;
    private playerTicksToAttack: number;
    private enemyTicksToAttack: number;

    private _crowdEnergyLevel: number = 0;
    set crowdEnergyLevel(newLevel: number) {
        newLevel <= 100 ? newLevel = newLevel : newLevel = 100;
        newLevel >= 0 ? newLevel = newLevel : newLevel = 0;
        this._crowdEnergyLevel = newLevel;
    }
    get crowdEnergyLevel(): number {
        return this._crowdEnergyLevel;
    }

    constructor(private route: ActivatedRoute,
                private scoreRegistrationService: ScoreRegistrationService,
                private gameIDService: GameIDService,
                private gladiatorService: GladiatorService,
                private routerExtensions: RouterExtensions) {
        this.route.queryParams.subscribe((params) => {
            this.battleScore = Number.parseInt(params.score || "0", 10);
        });
        this.sebastionImage.src = "~/app/images/Sebastion Right.png";
        this.lissomeImage.src = "~/app/images/Lissome.png";
        this.player = this.gladiatorService.gladiator;
        this.playerTicksToAttack = this.player.ticksPerAttack;
    }

    ngOnInit(): void {
        this.makeEnemy();
        this.enemyTicksToAttack = this.enemy.ticksPerAttack;
        trace.write(`Created ${this.enemy.name} with stats:\n` +
                        `\tStrength: ${this.enemy.fighterStatistics.strength}\n` +
                        `\tAgility: ${this.enemy.fighterStatistics.agility}\n` +
                        `\tVitality: ${this.enemy.fighterStatistics.vitality}\n` +
                        `\tEndurance: ${this.enemy.fighterStatistics.endurance}\n`,
                        traceCategories.Debug,
                        traceMessageType.info);
        // Preconditions for testing behavior in app. Allows last hit win for player that dies to win.
        this.playerTicksToAttack = 1;
        this.enemyTicksToAttack = 20;
        this.player.currentHealth = 1;
        this.player.currentStamina = 0;
        this.enemy.currentHealth = 1;
        this.enemy.currentStamina = 0;
    }

    letEnemyStrike(): any {
        while (this.enemy.currentHealth > 0 && this.enemyTicksToAttack < this.playerTicksToAttack) {
            if (this.enemy.currentStamina <= this.enemy.fighterStatistics.maxStamina * .1) {
                this.crowdEnergyLevel += 5;
                trace.write(`Crowd is getting excited: ${this.crowdEnergyLevel} Energy.`,
                    traceCategories.Debug, traceMessageType.info);
            }
            this.enemy.Attack(this.player);
            // Move the player ticks forward, reset enemy ticks
            this.playerTicksToAttack -= this.enemyTicksToAttack;
            this.enemyTicksToAttack = this.enemy.ticksPerAttack;

            if (this.player.currentHealth <= 0) {
                this.onEnemyWins();
            } else if (this.enemy.currentHealth <= 0) {
                this.onPlayerWins();
            }
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onAttackTap(eventData: EventData): void {
        // Each point of damage adds to player score, so capture current health
        const preEnemyHealth = this.enemy.currentHealth;
        // If enemy can strike first, it goes first.
        this.letEnemyStrike();
        if (this.player.currentHealth > 0) {
            if (this.player.currentStamina <= this.player.fighterStatistics.maxStamina * .1) {
                this.crowdEnergyLevel += 5;
                trace.write(`Crowd is getting excited: ${this.crowdEnergyLevel} Energy.`,
                    traceCategories.Debug, traceMessageType.info);
            }
            this.player.Attack(this.enemy);
            if (this.enemy.currentHealth > 0) {
                // Move the enemies ticks forward, reset player ticks
                this.enemyTicksToAttack -= this.playerTicksToAttack;
                this.playerTicksToAttack = this.player.ticksPerAttack;
                // Update damage score
                this.battleScore += preEnemyHealth - this.enemy.currentHealth + this.crowdEnergyLevel;
            } else {
                this.onPlayerWins();
            }
        }
    }

    onEnemyWins(): void {
        this.player.currentHealth = this.player.currentStamina = 0;
        const navigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                victory: false,
                score: this.battleScore,
                isGladiatorDead: true
            }
        };
        trace.write(`Enemy won, score was ${this.battleScore}`,
                  traceCategories.Debug, traceMessageType.info);
        this.routerExtensions.navigate(["arena/battle-end"], navigationExtras);
    }

    onPlayerWins(): void {
        // Determine if player won with more damage than needed.
        const wasOverkill: boolean = this.enemy.currentHealth * -1 / this.enemy.fighterStatistics.maxHealth >= .1;
        // Set the enemy health/stamina to 0
        this.enemy.currentHealth = this.enemy.currentStamina = 0;

        // Add bonus points for winning
        const bonusScoreFactor = wasOverkill ? 0.2 : 0.05;
        const scoreBonus = Math.round(this.enemy.fighterStatistics.maxHealth * bonusScoreFactor);
        this.battleScore += scoreBonus;

        const isGladiatorDead = this.player.currentHealth <= 0;
        const navigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                victory: true,
                score: this.battleScore,
                isGladiatorDead
            }
        };
        trace.write(`Player won, bonus was ${scoreBonus} and final score was ${this.battleScore}. Is gladiator dead was ${isGladiatorDead}`,
                  traceCategories.Debug, traceMessageType.info);
        this.routerExtensions.navigate(["arena/battle-end"], navigationExtras);
    }

    onTauntTap(eventData: EventData): void {
        const prePlayerHealth = this.player.currentHealth;
        this.enemy.Attack(this.player);
        this.enemyTicksToAttack = this.enemy.ticksPerAttack;
        this.crowdEnergyLevel += 5;
        trace.write(`Crowd is getting excited: ${this.crowdEnergyLevel} Energy.`,
                    traceCategories.Debug, traceMessageType.info);
        if (this.player.currentHealth <= 0) {
            this.onEnemyWins();
        } else if (this.enemy.currentHealth <= 0) {
            this.onPlayerWins();
        }
    }
    onTextChanged(eventData: EventData): void {
        // This is the first known method that is called by the textField,
        // so this stores the object in the backing field.
        if (!this.scoreTextField) {
            this.scoreTextField = <TextField> eventData.object;
        }
    }

    makeEnemy(): void {
        /* Set up a random enemy, within a couple of points of each of the player's stats */
        const newStats = new FighterStatistics();
        // newStats.strength = Math.round(Math.random() * 4 - 2 + this.player.fighterStatistics.strength);
        // newStats.agility = Math.round(Math.random() * 4 - 2 + this.player.fighterStatistics.agility);
        // newStats.vitality = Math.round(Math.random() * 4 - 2 + this.player.fighterStatistics.vitality);
        // newStats.endurance = Math.round(Math.random() * 4 - 2 + this.player.fighterStatistics.endurance);
        newStats.strength = 3;
        newStats.agility = 3;
        newStats.vitality = 8;
        newStats.endurance = 9;
        this.enemy = new Gladiator("Lissome Auger", newStats);
    }
}
