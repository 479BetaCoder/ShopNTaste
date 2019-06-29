import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private ingSub: Subscription;

  constructor(private shLstService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shLstService.getIngredients();
    this.ingSub = this.shLstService.addNewIngredient.subscribe((newIng: Ingredient[]) => {
        this.ingredients = newIng;
    });
  }

  ngOnDestroy() {
    this.ingSub.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.shLstService.editIngredient.next(index);
  }

}
