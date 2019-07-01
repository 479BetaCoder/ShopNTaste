import { Ingredient } from '../../shared/ingredient.model';
import * as shpLstActions from './shopping-list.action';

export interface ShoppingListState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const shpListInit = {
    ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomatoes', 10)],
    editedIngredient: null,
    editedIngredientIndex: -1
};
export function ShoppingListReducer(state: ShoppingListState = shpListInit, action: shpLstActions.ShoppingListActions) {
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
        case shpLstActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = { ...ingredient, ...action.payload};
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case shpLstActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case shpLstActions.START_EDIT:
            return {
                ...state,
                editedIngredient: {...state.ingredients[action.payload]},
                editedIngredientIndex: action.payload
            };
        case shpLstActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}
