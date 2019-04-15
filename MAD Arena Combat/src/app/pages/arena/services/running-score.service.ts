import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class RunningScoreService {
    currentScore: number;
}
