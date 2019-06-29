import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipesService {

    recipeChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) {}

    // private recipes: Recipe[] = [ new Recipe('Pan-Seared Pork Chops with Roasted Fennel and Tomatoes',
    // 'Juicy Pan-Seared Pork Chops with Roasted Fennel and Tomatoes',
    // 'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn',
    // [new Ingredient('Bun', 2), new Ingredient('Chicken', 2)]),
    // new Recipe('Chickpea and Halloumi Salad Recipe with Lentils', 'Fresh Chickpea and Halloumi Salad Recipe with Lentils',
    // 'https://images.immediate.co.uk/production/volatile/sites/2/2019/01/Halloumi1-9e3886a.jpg?quality=45&resize=620,413',
    // [new Ingredient('Sub', 2), new Ingredient('Veg', 10)])];

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }
    getRecipeByIndex(index: number) {
        return this.recipes.slice()[index];
    }
    addIngredientsToRecipe(ingredients: Ingredient[]) {
      this.slService.pushIngredients(ingredients);
    }

    addNewRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }

}
