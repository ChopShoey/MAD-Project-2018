import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { timestamp } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/ui/page/page";
import { GameIDService } from "~/app/services/gameID.service";
import { ScoreRegistrationService } from "~/app/services/scoreRegistration.service";
import { GamesEnum } from "~/app/shared/gamesEnum";
import { GladiatorService } from "../../services/gladiator.service";
import { RunningScoreService } from "../../services/running-score.service";
import { Gladiator } from "../../shared/gladiator";

@Component({
  selector: "ns-battle-end",
  templateUrl: "./battle-end.component.html",
  styleUrls: ["./battle-end.component.css"],
  moduleId: module.id
})
export class BattleEndComponent implements OnInit {
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
              private runningScoreService: RunningScoreService,
              private scoreRegistrationService: ScoreRegistrationService,
              private gameIDService: GameIDService) {
      this.route.queryParams.subscribe((params) => {
      this.victory = params.victory;
      this.isGladiatorDeadString = params.isGladiatorDead;
    });
  }

  ngOnInit() {
    // Unused
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  onFightAgainTap(eventData: EventData) {
    if (this.isGladiatorDead) {
      // Post the score for the current run.
      this.scoreRegistrationService.postScore(this.runningScoreService.currentScore,
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
    this.scoreRegistrationService.postScore(this.runningScoreService.currentScore,
      this.gameIDService.getGameGuid(GamesEnum.GLADIATOR_COMBAT));
    // Resting resets the current score
    this.runningScoreService.currentScore = 0;
  }

  navigateToArenaWithScore() {
    this.routerExtensions.navigate(["arena/arena"]);
  }
}
