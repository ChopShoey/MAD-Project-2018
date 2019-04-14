import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { EventData } from "tns-core-modules/ui/page/page";
import { GladiatorService } from "../../services/gladiator.service";
import { Gladiator } from "../../shared/gladiator";
import { timestamp } from "rxjs/operators";
import { ScoreRegistrationService } from "~/app/services/scoreRegistration.service";
import { GamesEnum } from "~/app/shared/gamesEnum";
import { GameIDService } from "~/app/services/gameID.service";

@Component({
  selector: "ns-battle-end",
  templateUrl: "./battle-end.component.html",
  styleUrls: ["./battle-end.component.css"],
  moduleId: module.id
})
export class BattleEndComponent implements OnInit {
  private battleScore: number;
  private victory: string;
  private isGladiatorDeadString: string;
  get isGladiatorDead(): boolean {
    return this.isGladiatorDeadString === "true";
  }
  get isGladiatorRested(): boolean {
    return this.gladiatorService.gladiator.currentHealth === 
      this.gladiatorService.gladiator.fighterStatistics.maxHealth && this.gladiatorService.gladiator.currentStamina
      === this.gladiatorService.gladiator.fighterStatistics.maxStamina;
  }

  constructor(private route: ActivatedRoute,
              private routerExtensions: RouterExtensions,
              private gladiatorService: GladiatorService,
              private scoreRegistrationService: ScoreRegistrationService,
              private gameIDService: GameIDService) {
      this.route.queryParams.subscribe((params) => {
      this.battleScore = Number.parseInt(params.score, 10);
      this.victory = params.victory;
      this.isGladiatorDeadString = params.isGladiatorDead;
    });
  }

  ngOnInit() {
    // Unused
  }

  onFightAgainTap(eventData: EventData) {
    if (this.isGladiatorDead) {
      // Post the score for the current run.
      this.scoreRegistrationService.postScore(this.battleScore,
        this.gameIDService.getGameGuid(GamesEnum.GLADIATOR_COMBAT));
      this.gladiatorService.generateBaseGladiator();
      this.routerExtensions.navigate(["arena/landing"]);
    } else {
      this.navigateToArenaWithScore();
    }
  }

  onRestTap(eventData: EventData) {
    this.gladiatorService.gladiator.currentHealth = this.gladiatorService.gladiator.fighterStatistics.maxHealth;
    this.gladiatorService.gladiator.currentStamina = this.gladiatorService.gladiator.fighterStatistics.maxStamina;
    // Post the score for the current run.
    this.scoreRegistrationService.postScore(this.battleScore,
      this.gameIDService.getGameGuid(GamesEnum.GLADIATOR_COMBAT));
    // Resting resets the current score
    this.battleScore = 0;
  }

  navigateToArenaWithScore() {
    const navigationExtras: ExtendedNavigationExtras = {
      queryParams: {
          score: this.battleScore
      }
    };
    this.routerExtensions.navigate(["arena/arena"], navigationExtras);
  }
}
