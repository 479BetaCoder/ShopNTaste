import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from '../recipe-list/recipes.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AppState } from '../appStore/app.reducer';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAuthenticated = false;

  collapsed = true;
  constructor(private dataServ: DataStorageService, private authServ: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
   this.userSub = this.store.select('authState').pipe(map(authState => authState.user)).subscribe(user => {
     this.isAuthenticated = !!user;
     });
  }

  onSaveData() {
    this.dataServ.saveRecipes();
  }
  onFetchData() {
    this.dataServ.fetchRecipes().subscribe();
  }
  onLogOut() {
    this.authServ.logOut();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
