import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../appStore/app.reducer';
import * as shpListActions from './store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private ingSub: Subscription;

  constructor(private store: Store<fromAppStore.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shpList');
    // this.ingredients = this.shLstService.getIngredients();
    // this.ingSub = this.shLstService.addNewIngredient.subscribe((newIng: Ingredient[]) => {
    //   this.ingredients = newIng;
    // });
  }

  ngOnDestroy() {
   // this.ingSub.unsubscribe();
  }

  onEditIngredient(index: number) {
  //  this.shLstService.editIngredient.next(index);
  this.store.dispatch(new shpListActions.StartEdit(index));
  }

}
