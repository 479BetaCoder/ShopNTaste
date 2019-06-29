import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ShoppingListService {

    addNewIngredient = new Subject<Ingredient[]>();
    editIngredient = new Subject<number>();

    private ingredients: Ingredient[] = [ new Ingredient('Apple', 5), new Ingredient('Tomatoes', 10)];

      getIngredients() {
        return this.ingredients.slice();
      }

      getIngredientByIndex(index: number) {
        return this.ingredients[index];
      }

      pushIngredient(ing: Ingredient) {
          this.ingredients.push(ing);
          this.addNewIngredient.next(this.ingredients.slice());
      }

      pushIngredients(ing: Ingredient[]) {
          this.ingredients.push(...ing);
          this.addNewIngredient.next(this.ingredients.slice());
      }

      updateIngredient(index: number, updatedIng: Ingredient) {
          this.ingredients[index] = updatedIng;
          this.addNewIngredient.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.addNewIngredient.next(this.ingredients.slice());
      }

}
