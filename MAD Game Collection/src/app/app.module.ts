// Author: Lee Shuman

import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ArenaAppModule } from "./pages/arena/arena-app.module";
import { ArenaRoutingModule } from "./pages/arena/arena-routing.module";
import { LeaderboardComponent } from "./pages/leaderboard/leaderboard.component";
import { PageNotFoundComponent } from "./pages/pageNotFound/pageNotFound.component";
import { SettingsComponent } from "./pages/settings/settings.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        ArenaAppModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        ArenaRoutingModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LeaderboardComponent,
        SettingsComponent,
        PageNotFoundComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
