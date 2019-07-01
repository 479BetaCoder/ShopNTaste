import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as shpListAction from '../store/shopping-list.action';
import * as fromAppStore from '../../appStore/app.reducer';


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

  constructor(private store: Store<fromAppStore.AppState>) { }

  ngOnInit() {
   this.editIngredientSub = this.store.select('shpList').subscribe(shpState => {

      if (shpState.editedIngredientIndex !== -1) {
        this.editMode = true;
        this.editedIngredient = shpState.editedIngredient;
        this.ingForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      } else {
        this.editMode = false;
      }
    });
    // this.editIngredientSub = this.shpLstService.editIngredient.subscribe((index: number) => {
    //   this.editMode = true;
    //   this.editIngIndex = index;
    //   this.editedIngredient = this.shpLstService.getIngredientByIndex(this.editIngIndex);
    //   // this.editedIngredient = this.store.dispatch(new shpListAction.GetIngredient(this.editIngIndex));
    //   this.ingForm.setValue({
    //     name: this.editedIngredient.name,
    //     amount: this.editedIngredient.amount
    //   });

  //  });
  }
  ngOnDestroy() {
    this.editIngredientSub.unsubscribe();
    this.store.dispatch(new shpListAction.StopEdit());

  }
  onAddItem(form: NgForm) {
    const formValue = form.value;
    const newIng = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      // this.shpLstService.updateIngredient(this.editIngIndex, newIng);
      this.store.dispatch(new shpListAction.UpdateIngredient(newIng));
    } else {
      this.store.dispatch(new shpListAction.AddIngredient(newIng));
      // this.shpLstService.pushIngredient(newIng);
    }
    this.onClearForm();
  }

  onDeleteItem() {
    //  this.shpLstService.deleteIngredient(this.editIngIndex);
    this.store.dispatch(new shpListAction.DeleteIngredient());
    this.onClearForm();
  }

  onClearForm() {
    this.editMode = false;
    this.ingForm.reset();
    this.store.dispatch(new shpListAction.StopEdit());
  }
}
