import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent],
    imports: [SharedModule, FormsModule, RouterModule.forChild([{ path: '', component: ShoppingListComponent }])]
})
export class ShoppingListModule {

}
