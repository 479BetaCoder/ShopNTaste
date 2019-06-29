import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/recipe-list', pathMatch: 'full'},
    { path: 'recipe-list', loadChildren: () => import('./recipe-list/recipes.module').then(m => m.RecipesModule)},
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    { path: '**', pathMatch: 'full', redirectTo: '/auth' }
];

@NgModule({
imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
exports: [ RouterModule ]
})
export class AppRoutesModule {
}
