// Author: Lee Shuman

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ArenaComponent } from "./pages/arena/arena.component";
import { BattleEndComponent } from "./pages/battle-end/battle-end.component";
import { ArenaLandingComponent } from "./pages/landing/landing.component";

const routes: Routes = [
    { path: "arena/arena", component: ArenaComponent },
    { path: "arena/landing", component: ArenaLandingComponent},
    { path: "arena/battle-end", component: BattleEndComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ArenaRoutingModule { }
