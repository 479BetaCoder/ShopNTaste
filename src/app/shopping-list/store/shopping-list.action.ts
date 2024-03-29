import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[ShoppingList] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[ShoppingList] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[ShoppingList] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[ShoppingList] DELETE_INGREDIENT';
export const GET_INGREDIENT = '[ShoppingList] GET_INGREDIENT';
export const START_EDIT = '[ShoppingList] START_EDIT';
export const STOP_EDIT = '[ShoppingList] STOP_EDIT';


export type ShoppingListActions =
  AddIngredient
| AddIngredients
| UpdateIngredient
| DeleteIngredient
| StartEdit
| StopEdit ;

export class AddIngredient implements Action {
   readonly type = ADD_INGREDIENT;
   constructor(public payload: Ingredient) { }
}
export class AddIngredients implements Action {
   readonly type = ADD_INGREDIENTS;
   constructor(public payload: Ingredient[]) { }
}

export class UpdateIngredient implements Action {
   readonly type = UPDATE_INGREDIENT;
   constructor(public payload: Ingredient) { }
}

export class DeleteIngredient implements Action {
   readonly type = DELETE_INGREDIENT;
   constructor() { }
}

export class StartEdit implements Action {
   readonly type = START_EDIT;
   constructor(public payload: number) {}
}

export class StopEdit implements Action {
   readonly type = STOP_EDIT;
}
