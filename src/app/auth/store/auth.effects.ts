import { Actions, ofType, Effect } from '@ngrx/effects';
import * as authActions from '../store/auth.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { User } from '../user.model';
import { Injectable } from '@angular/core';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
    constructor(private action: Actions, private http: HttpClient) {}
    @Effect()
    authLogin = this.action.pipe(
        ofType(authActions.LOGIN_START),
        switchMap((authData: authActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey, {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map(resData => {
                        const expirationDate = new Date(
                            new Date().getTime() + +resData.expiresIn * 1000
                        );
                        const user =
                        new User(resData.email, resData.localId, resData.idToken, expirationDate);
                        return of(new authActions.LoginUser(user));
                    })
                );
        })
    );
}
