import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { EventData } from "tns-core-modules/ui/page/page";
import { GladiatorService } from "../../services/gladiator.service";
import { Gladiator } from "../../shared/gladiator";
import { timestamp } from "rxjs/operators";

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

  constructor(private route: ActivatedRoute,
              private routerExtensions: RouterExtensions,
              private gladiatorService: GladiatorService) {
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
      // Get score service and post the score here next time
      this.gladiatorService.generateBaseGladiator();
      this.routerExtensions.navigate(["arena/landing"]);
    } else {
      this.navigateToArenaWithScore();
    }
  }

  onRestTap(eventData: EventData) {
    this.gladiatorService.gladiator.currentHealth = this.gladiatorService.gladiator.fighterStatistics.maxHealth;
    this.gladiatorService.gladiator.currentStamina = this.gladiatorService.gladiator.fighterStatistics.maxStamina;
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
