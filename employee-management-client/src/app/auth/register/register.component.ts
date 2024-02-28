import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as AuthActions from '../store/auth.actions';
import { Subscription } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  last_name: string = '';
  first_name: string = '';
  email: string = 'test@test.com';
  password: string = '';
  confirm_password: string = '';

  showAlert: boolean = false;
  isLoading: boolean = false;
  showError: boolean = false;

  error: string = null;
  user:User = null;

  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showError = true;
      } else {
        this.user = authState.user;
        if (this.user) {
          this.showAlert = true;
        }
      }
    });
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(AuthActions.signUpStart({payload: {
      firstName: this.first_name,
      lastName: this.last_name,
      email: this.email,
      password: this.password,
      role: 'USER',
    }}))
    form.reset();
  }

  onAlertButtonClicked() {
    this.showAlert = false;
  }

  onErrorButtonClicked() {
    this.showError = false;
  }
}
