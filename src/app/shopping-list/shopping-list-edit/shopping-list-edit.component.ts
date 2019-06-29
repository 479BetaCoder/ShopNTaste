import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as shpListAction from '../store/shopping-list.action';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) ingForm: NgForm;
  editIngredientSub: Subscription;
  editMode = false;
  editIngIndex: number;
  editedIngredient: Ingredient;

  constructor(private shpLstService: ShoppingListService, private store: Store<{ shpList: { ingredients: Ingredient[] } }>) { }

  ngOnInit() {
    this.editIngredientSub = this.shpLstService.editIngredient.subscribe((index: number) => {
      this.editMode = true;
      this.editIngIndex = index;
      this.editedIngredient = this.shpLstService.getIngredientByIndex(this.editIngIndex);

      this.ingForm.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      });

    });
  }
  ngOnDestroy() {
    this.editIngredientSub.unsubscribe();
  }
  onAddItem(form: NgForm) {
    const formValue = form.value;
    const newIng = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      this.shpLstService.updateIngredient(this.editIngIndex, newIng);
    } else {
      this.store.dispatch(new shpListAction.AddIngredient(newIng));
      // this.shpLstService.pushIngredient(newIng);
    }
    this.onClearForm();
  }

  onDeleteItem() {
    this.shpLstService.deleteIngredient(this.editIngIndex);
    this.onClearForm();
  }

  onClearForm() {
    this.editMode = false;
    this.ingForm.reset();
  }
}
