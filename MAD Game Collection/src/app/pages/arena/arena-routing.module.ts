// Author: Lee Shuman

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ArenaComponent } from "./pages/arena/arena.component";
import { ArenaLandingComponent } from "./pages/landing/landing.component";

const routes: Routes = [
    { path: "arena/arena", component: ArenaComponent },
    { path: "arena/landing", component: ArenaLandingComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ArenaRoutingModule { }
