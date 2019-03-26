// Author: Lee Shuman

import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { PageNotFoundComponent } from "./pageNotFound.component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        PageNotFoundComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PageNotFoundModule { }
