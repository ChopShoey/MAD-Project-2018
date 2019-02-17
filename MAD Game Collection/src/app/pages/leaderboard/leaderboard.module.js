"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var leaderboard_routing_module_1 = require("./leaderboard-routing.module");
var leaderboard_component_1 = require("./leaderboard.component");
var LeaderboardModule = /** @class */ (function () {
    function LeaderboardModule() {
    }
    LeaderboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                leaderboard_routing_module_1.LeaderboardRoutingModule
            ],
            declarations: [
                leaderboard_component_1.LeaderboardComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], LeaderboardModule);
    return LeaderboardModule;
}());
exports.LeaderboardModule = LeaderboardModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZGVyYm9hcmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGVhZGVyYm9hcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUV2RSwyRUFBd0U7QUFDeEUsaUVBQStEO0FBYy9EO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixpQkFBaUI7UUFaN0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIscURBQXdCO2FBQzNCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRDQUFvQjthQUN2QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csaUJBQWlCLENBQUk7SUFBRCx3QkFBQztDQUFBLEFBQWxDLElBQWtDO0FBQXJCLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgTGVhZGVyYm9hcmRSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vbGVhZGVyYm9hcmQtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IExlYWRlcmJvYXJkQ29tcG9uZW50IH0gZnJvbSBcIi4vbGVhZGVyYm9hcmQuY29tcG9uZW50XCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgICAgIExlYWRlcmJvYXJkUm91dGluZ01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExlYWRlcmJvYXJkQ29tcG9uZW50XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExlYWRlcmJvYXJkTW9kdWxlIHsgfVxuIl19