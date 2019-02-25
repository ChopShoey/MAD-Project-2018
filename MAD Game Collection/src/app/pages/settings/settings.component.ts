// Author/s: Lee Shuman

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { EventData } from "tns-core-modules/ui/page/page";
import { TextField } from "tns-core-modules/ui/text-field";
import { PlayerService } from "~/app/services/player.service";

@Component({
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html"
})
export class SettingsComponent {
    private nameTextField: TextField;
    private isTextFieldEmpty: boolean = true;

    constructor(private playerService: PlayerService, private router: Router) {
        // Use the component constructor to inject providers.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onTextChanged(eventData: EventData): void {
        // This is the first known method that is called by the textField,
        // so this stores the object in the backing field.
        if (!this.nameTextField) {
            this.nameTextField = <TextField> eventData.object;
        }
        // Only set the isTextFieldEmpty field to true if it has non-empty/non-whitespace characters
        this.nameTextField.text.trim() ? this.isTextFieldEmpty = false : this.isTextFieldEmpty = true;
    }

    // Allows submission through the soft keyboard "done" key
    onReturnPress(eventData: EventData): void {
        this.submitPlayerName(this.nameTextField.text);
    }

    // Allows submission through the on screen button
    onSubmitTap(eventData: EventData): void {
        this.submitPlayerName(this.nameTextField.text);
    }

    // Used to update the player name in the playerService. Catches errors if playerName is invalid.
    // Default behavior is to go to the home screen if the player name is successfully set.
    submitPlayerName(playerName: string) {
        try {
            this.playerService.postPlayerName(playerName, this.onSuccessfulPost, this);
            // this.router.navigateByUrl("/home");
        } catch (error) {
            console.log(`Caught ${error}`);
        }
    }

    onSuccessfulPost(settingsComponent: SettingsComponent, success: boolean): void {
        if (success) {
            settingsComponent.router.navigateByUrl("/home");
        } else {
            dialogs.alert("Name could not be updated").then(() => {
                console.log("Dialog closed");
            });
        }
    }
}
