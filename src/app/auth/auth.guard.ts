import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { AppState } from '../appStore/app.reducer';
import { Store } from '@ngrx/store';


@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
    constructor(private authServ: AuthService, private router: Router, private store: Store<AppState>) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('authState').pipe(
            take(1),
            map(authState => {
            return authState.user;
            }),
            map(user => {
            const isValidUser = !!user;
            return isValidUser === true ? true : this.router.createUrlTree(['/auth']);
        }));
    }
}
