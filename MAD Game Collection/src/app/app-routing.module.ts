// Author/s: Lee Shuman, Paul Christy, Diane Truong

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ArenaComponent } from "./pages/arena/arena.component";
import { CatsComponent } from "./pages/cats/cats.component";
import { HomeComponent } from "./pages/home/home.component";
import { LeaderboardComponent } from "./pages/leaderboard/leaderboard.component";
import { PageNotFoundComponent } from "./pages/pageNotFound/pageNotFound.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { SudokuComponent } from "./pages/sudoku/sudoku.component";

const routes: Routes = [
    { path: "", redirectTo: "/home)", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "arena", component: ArenaComponent },
    { path: "cats", component: CatsComponent },
    { path: "sudoku", component: SudokuComponent },
    { path: "leaderboard", component: LeaderboardComponent },
    { path: "settings", component: SettingsComponent },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
