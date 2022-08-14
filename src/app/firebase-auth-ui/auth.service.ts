import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/auth';

import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({ providedIn:'root' })
export class AuthService {

  private _user?: firebase.User;
  private ui?: any;
  private uiConfig;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public snackBar: MatSnackBar,
  ) {

    this.uiConfig = {
      signInSuccessUrl: '/admin',
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
          disableSignUp: { status: true },
        }
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    };

    afAuth.authState.subscribe(user =>  {
        if (user) this._user = user;
    });
  }

  get user(): firebase.User {
    return this._user!;
  }

  set user(value: firebase.User) {
    this._user = value;
  }

  get authenticated(): boolean {
    return this._user !== null;
  }

  get id(): string {
    return this.authenticated ? this.user.uid : '';
  }

  signOut(): void {
    this.afAuth.signOut();
    this.router.navigateByUrl('/');
  }

  startFirebaseUi(){
    if (this.ui){
      this.ui.reset();
    } else {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    this.ui.start('#firebaseui-auth-container', this.uiConfig);
  }

  getUserName(){
    return this._user?.displayName;
  }
}
