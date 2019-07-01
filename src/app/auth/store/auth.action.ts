import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN_START = '[Auth] LOGIN_START';
export const LOGIN_USER = '[Auth] LOGIN_USER';
export const LOGOUT_USER = '[Auth] LOGOUT_USER';


export class LoginUser implements Action {
    readonly type = LOGIN_USER;
    constructor(public payload: User) {}
}

export class LogoutUser implements Action {
    readonly type = LOGOUT_USER;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string}) {}
}

export type AuthAction = LoginUser | LogoutUser;
