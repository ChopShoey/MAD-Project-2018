// Author: Lee Shuman
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { EventData } from "tns-core-modules/ui/page/page";
import { TextField } from "tns-core-modules/ui/text-field/text-field";

@Component({
  selector: "ns-landing",
  templateUrl: "./landing.component.html",
  moduleId: module.id
})
export class ArenaLandingComponent implements OnInit {

  private nameTextField: TextField;
  get isTextFieldEmpty(): boolean {
    return this.nameTextField && this.nameTextField.text.replace(/\s/g, "") ? false : true;
  }
  private _gladiatorName: string;
  get gladiatorName(): string {
    return this._gladiatorName;
  }

  constructor(private router: Router) {
    // May be useful for importing services for loading.
  }

  ngOnInit() {
    // Start background loading??
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  onSubmitTap(eventData: EventData): void {
    this.submitGladiatorName();
  }

  onTextChanged(eventData: EventData): void {
    // This is the first known method that is called by the textField,
    // so this stores the object in the backing field.
    if (!this.nameTextField) {
      this.nameTextField = <TextField> eventData.object;
    }
  }

  onReturnPress(eventData: EventData): void {
    this.submitGladiatorName();
  }

  submitGladiatorName(): void {
    this.router.navigateByUrl("arena/arena");
  }
}
