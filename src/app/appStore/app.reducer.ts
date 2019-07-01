import { ShoppingListState, ShoppingListReducer } from '../shopping-list/store/shopping-list.reducer';
import { AuthState, AuthReducer } from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shpList: ShoppingListState;
    authState: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    shpList: ShoppingListReducer,
    authState: AuthReducer
};
