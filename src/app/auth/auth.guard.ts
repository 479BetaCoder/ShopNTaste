import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
    constructor(private authServ: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authServ.user.pipe(
            take(1),
            map(user => {
            const isValidUser = !!user;
            return isValidUser === true ? true : this.router.createUrlTree(['/auth']);
        }));
    }
}
