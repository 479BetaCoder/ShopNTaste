import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input() activeRecipe: Recipe;
  activeRecipe: Recipe;
  recipeIndex: number;
  constructor(private recipeService: RecipesService, private activeRoute: ActivatedRoute,
    private route: Router) { }


  ngOnInit() {
    this.activeRoute.params.subscribe((param: Params) => {
        this.recipeIndex = +param[`id`];
        this.activeRecipe = this.recipeService.getRecipeByIndex(this.recipeIndex);
    });
  }

    onSlClicked() {
        this.recipeService.addIngredientsToRecipe(this.activeRecipe.ingredients);
    }

    onDeleteRecipe() {
      this.recipeService.deleteRecipe(this.recipeIndex);
      this.route.navigate(['/recipe-list']);
    }

}
