// Author: Lee Shuman

import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Image } from "tns-core-modules/ui/image";
import { EventData } from "tns-core-modules/ui/page/page";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { GameIDService } from "~/app/services/gameID.service";
import { ScoreRegistrationService } from "~/app/services/scoreRegistration.service";
import { GladiatorService } from "../../services/gladiator.service";
import { FighterStatistics } from "../../shared/fighterStatistics";
import { Gladiator } from "../../shared/gladiator";

@Component({
    selector: "Arena",
    moduleId: module.id,
    templateUrl: "./arena.component.html"
})
export class ArenaComponent implements OnInit {
    private readonly sebastionImage: Image = new Image();
    private readonly lissomeImage: Image = new Image();
    private scoreTextField: TextField;
    private playerHealth: number;
    private enemyHealth: number;
    private enemy: Gladiator;
    private playerGladiator: Gladiator;

    constructor(private scoreRegistrationService: ScoreRegistrationService,
                private gameIDService: GameIDService,
                private gladiatorService: GladiatorService) {
        this.sebastionImage.src = "~/app/images/Sebastion Right.png";
        this.lissomeImage.src = "~/app/images/Lissome.png";
        this.playerGladiator = this.gladiatorService.gladiator;
    }

    ngOnInit(): void {
        this.playerHealth = this.gladiatorService.gladiator.fighterStatistics.maxHealth;
        this.makeEnemy();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onAttackTap(eventData: EventData): void {
        // Have the gladiator attack the enemy, and then enemy attack target
        // If gladiator health drops below 0, kill them off and start new gladiator
        // If target health drops below 0, post score for the opponent
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
        newStats.strength = Math.random() * 4 - 2 + this.playerGladiator.fighterStatistics.strength;
        newStats.agility = Math.random() * 4 - 2 + this.playerGladiator.fighterStatistics.agility;
        newStats.defense = Math.random() * 4 - 2 + this.playerGladiator.fighterStatistics.defense;
        newStats.vitality = Math.random() * 4 - 2 + this.playerGladiator.fighterStatistics.vitality;
        newStats.endurance = Math.random() * 4 - 2 + this.playerGladiator.fighterStatistics.endurance;
        this.enemy = new Gladiator("Lissome Auger", newStats);
    }
}
