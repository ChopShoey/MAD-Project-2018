// Author: Lee Shuman

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ArenaComponent } from "./arena.component";

const routes: Routes = [
    { path: "arena", component: ArenaComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ArenaRoutingModule { }
