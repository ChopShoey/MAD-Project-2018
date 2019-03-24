import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CatsRoutingModule } from "./cats-routing.module";
import { CatsComponent } from "./cats.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CatsRoutingModule
    ],
    declarations: [
        CatsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CatsModule { }
