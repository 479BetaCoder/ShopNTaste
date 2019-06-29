import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loggedInMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authServ: AuthService, private router: Router) { }

  ngOnInit() {
  }

  switchUserMode() {
    this.loggedInMode = !this.loggedInMode;
  }
  onAuthSubmit(authForm: NgForm) {
    this.isLoading = true;
    if (authForm.invalid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponseData>;
    if (this.loggedInMode) {
     authObs = this.authServ.login(email, password);
    } else {
      authObs = this.authServ.signUp(email, password);
    }
    authObs.subscribe(resData => {
      console.log(resData);
      this.router.navigate(['/recipe-list']);
      this.isLoading = false;
      }, errorMsg => {
      console.log(errorMsg);
      this.error = errorMsg;
      this.isLoading = false;
    });
    authForm.reset();
  }
  onErrorModal() {
    this.error = null;
  }

}
