import { Component, OnInit } from "@angular/core";

import { AuthService } from "./auth.service";

@Component({
    selector: 'firebase-auth-ui',
    templateUrl: './firebase-auth-ui.component.html',
    styleUrls: ['./firebase-auth-ui.component.css']
})
export class FirebaseAuthUiComponent implements OnInit {
    showLogin = false;
    public ui?: any;
    started: boolean = false;

    constructor(
        private authService: AuthService,
    ) {   }

    ngOnInit() {
        this.authService.startFirebaseUi();
    }

}
