// Author: Lee Shuman

import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { SelectedIndexChangedEventData, TabView } from "tns-core-modules/ui/tab-view";
import { GameIDService } from "~/app/services/gameID.service";
import { LeaderboardService } from "~/app/services/leaderboard.service";
import { GamesEnum } from "~/app/shared/gamesEnum";
import { LeaderboardEntry } from "~/app/shared/leaderboardEntry";

@Component({
    selector: "Leaderboard",
    moduleId: module.id,
    templateUrl: "./leaderboard.component.html"
})
export class LeaderboardComponent implements OnInit {

    constructor(private gameIDService: GameIDService, private leaderboardService: LeaderboardService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.onTapCats();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onTapCats(): void {
        this.leaderboardService.requestTopTen(this.gameIDService.getGameGuid(GamesEnum.ANGRY_CATS));
    }

    onTapArena(): void {
        this.leaderboardService.requestTopTen(this.gameIDService.getGameGuid(GamesEnum.GLADIATOR_COMBAT));
    }

    onTapSudoku(): void {
        this.leaderboardService.requestTopTen(this.gameIDService.getGameGuid(GamesEnum.SUDOKU));
    }
}
