import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CatsRoutingModule } from "./cats-routing.module";
import { CatsComponent } from "./cats.component";
import { BrowseRoutingModule } from "./browse-routing.module";
import { BrowseComponent } from "./browse.component";
import { AngryCatsComponent } from './angry-cats/angry-cats.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CatsRoutingModule
    ],
    declarations: [
        CatsComponent
        BrowseComponent,
        AngryCatsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CatsModule { }
