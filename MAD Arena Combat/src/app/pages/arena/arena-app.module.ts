import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ArenaComponent } from "./pages/arena/arena.component";
import { ArenaLandingComponent } from "./pages/landing/landing.component";

@NgModule({
  imports: [
    NativeScriptCommonModule
  ],
  declarations: [
    ArenaLandingComponent,
    ArenaComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ArenaAppModule { }
