import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  last_name: string = '';
  first_name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';

  showAlert: boolean = false;
  isLoading: boolean = false;
  showError: boolean = false;

  error: string = null;
  user:User = null;

  private storeSub: Subscription; 

  constructor(private store: Store<fromApp.AppState>,private router: Router){}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showError = true;
      } else {
        this.showAlert = authState.signUpSent;
      }
    });
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(AuthActions.signUpStart(
      {
        payload: {
          firstName: this.first_name,
          lastName: this.last_name,
          email: this.email,
          password: this.password,
          role: 'USER',
        }
      }
    ));
    form.reset();
  }

  onAlertButtonClicked() {
    this.showAlert = false;
    this.router.navigate(['auth/login']);
  }

  onErrorButtonClicked() {
    this.showError = false;
  }
}
