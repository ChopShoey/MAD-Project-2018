// Author: Lee Shuman

import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { LeaderboardRoutingModule } from "./leaderboard-routing.module";
import { LeaderboardComponent } from "./leaderboard.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        LeaderboardRoutingModule
    ],
    declarations: [
        LeaderboardComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LeaderboardModule { }
