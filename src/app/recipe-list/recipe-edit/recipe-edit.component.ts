import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private activeRoute: ActivatedRoute, private recipeService: RecipesService, private route: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = +params[`id`];
      this.editMode = params[`id`] != null;
      this.initForm();
      });
  }

  onRecipeSubmit() {
    if (this.editMode) {
     this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addNewRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDesc = '';
    const recipeIng = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeByIndex(this.id);
      recipeName = recipe.name;
      recipeImg = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe.ingredients) {
      for (const ing of recipe.ingredients) {
        recipeIng.push(new FormGroup({
        name: new FormControl(ing.name, Validators.required),
        amount: new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
      }
    }
  }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      imagePath: new FormControl(recipeImg, Validators.required),
      ingredients: recipeIng
    });

  }

  getControls() {
      return ( this.recipeForm.get('ingredients') as FormArray ).controls;
    }
  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onCancel() {
    this.route.navigate(['../'], {relativeTo: this.activeRoute});
  }

  onDeleteIng(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

}
