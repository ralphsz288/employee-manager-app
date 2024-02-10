import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  last_name: string = '';
  first_name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';

  constructor(private store: Store<fromApp.AppState>){}
  
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
}
