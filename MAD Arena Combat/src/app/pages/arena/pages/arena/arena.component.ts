// Author: Lee Shuman

import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/ui/page/page";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { GameIDService } from "~/app/services/gameID.service";
import { ScoreRegistrationService } from "~/app/services/scoreRegistration.service";
import { GamesEnum } from "../../../../shared/gamesEnum";

@Component({
    selector: "Arena",
    moduleId: module.id,
    templateUrl: "./arena.component.html"
})
export class ArenaComponent implements OnInit {
    private scoreTextField: TextField;

    constructor(private scoreRegistrationService: ScoreRegistrationService, private gameIDService: GameIDService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSubmitTap(eventData: EventData): void {
        this.scoreRegistrationService.postScore(Number.parseInt(this.scoreTextField.text, 10),
                                                this.gameIDService.getGameGuid(GamesEnum.GLADIATOR_COMBAT));
    }

    onTextChanged(eventData: EventData): void {
        // This is the first known method that is called by the textField,
        // so this stores the object in the backing field.
        if (!this.scoreTextField) {
            this.scoreTextField = <TextField> eventData.object;
        }
    }
}
