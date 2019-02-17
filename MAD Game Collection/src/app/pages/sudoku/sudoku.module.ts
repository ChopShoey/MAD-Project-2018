import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SudokuRoutingModule } from "./sudoku-routing.module";
import { SudokuComponent } from "./sudoku.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SudokuRoutingModule
    ],
    declarations: [
        SudokuComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SudokuModule { }
