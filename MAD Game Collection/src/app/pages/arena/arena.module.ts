import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ArenaRoutingModule } from "./arena-routing.module";
import { ArenaComponent } from "./arena.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ArenaRoutingModule
    ],
    declarations: [
        ArenaComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ArenaModule { }
