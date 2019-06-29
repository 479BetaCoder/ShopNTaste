import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from '../recipe-list/recipes.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAuthenticated = false;

  collapsed = true;
  constructor(private dataServ: DataStorageService, private authServ: AuthService) { }

  ngOnInit() {
   this.userSub = this.authServ.user.subscribe(user => {
     this.isAuthenticated = !!user;
     console.log(!user);
     console.log(!!user);
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
