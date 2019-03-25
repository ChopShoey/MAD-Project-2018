// Author: Lee Shuman

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LeaderboardComponent } from "./pages/leaderboard/leaderboard.component";
import { PageNotFoundComponent } from "./pages/pageNotFound/pageNotFound.component";
import { SettingsComponent } from "./pages/settings/settings.component";

const routes: Routes = [
    { path: "", redirectTo: "/home)", pathMatch: "full" },
    { path: "leaderboard", component: LeaderboardComponent },
    { path: "settings", component: SettingsComponent },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
