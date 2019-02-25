import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EventData } from "tns-core-modules/ui/page/page";

@Component({
  selector: "ns-landing",
  templateUrl: "./landing.component.html",
  moduleId: module.id
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) {
    // May be useful for importing services for loading.
  }

  ngOnInit() {
    // Start background loading??
  }

  onSubmitTap(eventData: EventData): void {
    this.router.navigateByUrl("arena/arena");
  }
}
