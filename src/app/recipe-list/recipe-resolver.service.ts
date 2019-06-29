import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe[]> {
    constructor(private dataServ: DataStorageService, private recipServ: RecipesService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.recipServ.getRecipes().length === 0) {
            return this.dataServ.fetchRecipes();
        } else {
            return this.recipServ.getRecipes();
        }

    }
}
