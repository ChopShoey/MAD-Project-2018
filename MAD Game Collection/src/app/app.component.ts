// Author: Lee Shuman

import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { addCategories, addWriter, categories, clearWriters, enable } from "tns-core-modules/trace";
import { PlayerService } from "./services/player.service";
import { TimestampConsoleWriter } from "./shared/timestampConsoleWriter";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router,
                private routerExtensions: RouterExtensions,
                private playerService: PlayerService) {
        addCategories(`${categories.Debug}, ${categories.Error}`);
        enable();
        clearWriters();
        addWriter(new TimestampConsoleWriter());
    }

    ngOnInit(): void {
        this.playerService.isPlayerNameSet() ? this._activatedUrl = "/arena/landing" : this._activatedUrl = "/settings";
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.router.navigateByUrl(this._activatedUrl);

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
