// Author/s: Lee Shuman, Paul Christy, Diane Truong

import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ArenaAppModule } from "./pages/arena/arena-app.module";
import { ArenaRoutingModule } from "./pages/arena/arena-routing.module";
import { CatsComponent } from "./pages/cats/cats.component";
import { HomeComponent } from "./pages/home/home.component";
import { LeaderboardComponent } from "./pages/leaderboard/leaderboard.component";
import { PageNotFoundComponent } from "./pages/pageNotFound/pageNotFound.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { SudokuComponent } from "./pages/sudoku/sudoku.component";

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
        HomeComponent,
        CatsComponent,
        SudokuComponent,
        LeaderboardComponent,
        SettingsComponent,
        PageNotFoundComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
