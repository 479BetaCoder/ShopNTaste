import { Ingredient } from '../../shared/ingredient.model';
import * as shpLstActions from './shopping-list.action';

const shpListInit = {
    ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomatoes', 10)]
};
export function ShoppingListReducer(state = shpListInit, action: shpLstActions.ShoppingListActions) {
    switch (action.type) {
        case shpLstActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case shpLstActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        default:
            return state;
    }
}
