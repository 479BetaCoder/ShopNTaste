import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { AppState } from '../appStore/app.reducer';
import { Store } from '@ngrx/store';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authServ: AuthService, private store: Store<AppState>) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
       return this.store.select('authState').pipe(take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {
                if (!user) {
                return next.handle(req);
                }
                const modifiedReq = req.clone(
                {params: new HttpParams().set('auth', user.token)});

                return next.handle(modifiedReq);
            }));
    }

}
