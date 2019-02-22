// Author: Lee Shuman

import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { SelectedIndexChangedEventData, TabView } from "tns-core-modules/ui/tab-view";
import { GameIDService } from "~/app/services/gameID.service";
import { GamesEnum } from "~/app/shared/gamesEnum";

@Component({
    selector: "Leaderboard",
    moduleId: module.id,
    templateUrl: "./leaderboard.component.html"
})
export class LeaderboardComponent implements OnInit {

    private gameSelection: GamesEnum = GamesEnum.ANGRY_CATS;

    constructor(gameIDService: GameIDService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
