import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "arena", loadChildren: "~/app/arena/arena.module#ArenaModule" },
    { path: "cats", loadChildren: "~/app/cats/cats.module#CatsModule" },
    { path: "sudoku", loadChildren: "~/app/sudoku/sudoku.module#SudokuModule" },
    { path: "leaderboard", loadChildren: "~/app/leaderboard/leaderboard.module#LeaderboardModule" },
    { path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
