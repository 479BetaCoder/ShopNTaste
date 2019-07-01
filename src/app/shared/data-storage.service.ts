import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipesService } from '../recipe-list/recipes.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Recipe } from '../recipe-list/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, private recServ: RecipesService, private authServ: AuthService) { }

    saveRecipes() {
        const recipes = this.recServ.getRecipes();
        this.http.put('https://shopntaste.firebaseio.com/recipes.json', recipes).subscribe(response => {
            console.log(response);
        });
    }
    fetchRecipes() {
        return this.http.get<Recipe[]>('https://shopntaste.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                if (recipes != null) {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }
            }), tap(recipes => {
                if (recipes != null) {
                    this.recServ.setRecipes(recipes);
                }
            }));
    }

}
