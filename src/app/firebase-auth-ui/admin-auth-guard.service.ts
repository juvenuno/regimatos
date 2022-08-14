import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn:'root' })
export class AdminAuthGuard implements CanLoad, CanActivate {

    constructor(
      private router: Router,
      private authService: AuthService
    ) {}

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
      return this.authService.afAuth.authState.pipe(
        take(1),
        map((authState) => !!authState),
        tap(authenticated => {
          if (!authenticated) this.router.navigate(['/login'])
        })
      )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      return this.authService.afAuth.authState.pipe(
        take(1),
        map((authState) => !!authState),
        tap(authenticated => {
          if (!authenticated) this.router.navigate(['/login'])
        })
      )
   }
}
