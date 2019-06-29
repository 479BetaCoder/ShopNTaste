import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-item/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeResolver } from './recipe-resolver.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

const recipeRoutes: Routes = [
        { path: '', component: RecipeListComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver] }
        ],
        canActivate: [AuthGuardService]
    },
];
@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}
