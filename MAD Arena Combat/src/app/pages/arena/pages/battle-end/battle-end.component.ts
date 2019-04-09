import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { EventData } from "tns-core-modules/ui/page/page";
import { GladiatorService } from "../../services/gladiator.service";

@Component({
  selector: "ns-battle-end",
  templateUrl: "./battle-end.component.html",
  styleUrls: ["./battle-end.component.css"],
  moduleId: module.id
})
export class BattleEndComponent implements OnInit {
  private battleScore: number;
  private victory: string;

  constructor(private route: ActivatedRoute,
              private routerExtensions: RouterExtensions,
              private gladiatorService: GladiatorService) {
      this.route.queryParams.subscribe((params) => {
      this.battleScore = Number.parseInt(params.score, 10);
      this.victory = params.victory;
    });
  }

  ngOnInit() {
    // Unused
  }

  onMoreTap(eventData: EventData) {
    const navigationExtras: ExtendedNavigationExtras = {
      queryParams: {
          score: this.battleScore
      }
    };
    this.routerExtensions.navigate(["arena/arena"], navigationExtras);
  }

  onRestTap(eventData: EventData) {
    this.gladiatorService.gladiator.currentHealth = this.gladiatorService.gladiator.fighterStatistics.maxHealth;
    this.gladiatorService.gladiator.currentStamina = this.gladiatorService.gladiator.fighterStatistics.maxStamina;
  }
}
