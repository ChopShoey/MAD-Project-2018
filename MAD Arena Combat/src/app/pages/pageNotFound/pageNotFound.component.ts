// Author: Lee Shuman

import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/ui/page/page";
import { SelectedIndexChangedEventData, TabView } from "tns-core-modules/ui/tab-view";
import { GameIDService } from "~/app/services/gameID.service";
import { GamesEnum } from "~/app/shared/gamesEnum";

@Component({
    selector: "Page Not Found",
    moduleId: module.id,
    templateUrl: "./pageNotFound.component.html"
})
export class PageNotFoundComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
