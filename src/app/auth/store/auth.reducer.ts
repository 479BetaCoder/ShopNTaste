import { User } from '../user.model';
import * as authActions from './auth.action';

export interface AuthState {
    user: User;
}

const authInit: AuthState = {
    user: null
};

export function AuthReducer(state: AuthState = authInit, action: authActions.AuthAction) {
    switch (action.type) {
        case authActions.LOGIN_USER:
            return {
                ...state,
                user: action.payload
            };
        case authActions.LOGOUT_USER:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}
