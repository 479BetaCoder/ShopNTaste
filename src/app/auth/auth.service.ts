import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router) { }

    signUp(emailId: string, pwd: string) {
        return this.http.post<AuthResponseData>
            ('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey, {
                email: emailId,
                password: pwd,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(resData => {
                this.handleUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }
    login(emailId: string, pwd: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey, {
                email: emailId,
                password: pwd,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(resData => {
                this.handleUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }
    logOut() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;

    }
    autoLogOut(expirationTime: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationTime);
    }
    autoLogin() {
        const userData: {
            email: string,
            id: string,
            // tslint:disable-next-line:variable-name
            _token: string,
            tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loggedInUser = new User(userData.email, userData.id, userData._token, new Date(userData.tokenExpirationDate));
        if (loggedInUser.token) {
            this.user.next(loggedInUser);
            const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration);
        }
    }

    private handleUser(emailId: string, id: string, token: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const loggedUser = new User(emailId, id, token, expirationDate);
        this.user.next(loggedUser);
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(loggedUser));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMsg = 'An unknown error occured';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = 'This email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMsg = 'The password is incorrect';
                break;
        }
        return throwError(errorMsg);
    }

}
