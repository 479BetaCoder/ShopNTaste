import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  currentRecipe: Recipe;
  @Input() index: number;
  constructor(private recipeService: RecipesService, private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentRecipe = this.recipeService.getRecipeByIndex(this.index);
  }

}
