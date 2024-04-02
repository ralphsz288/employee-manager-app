import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  isLoading: boolean = false;
  showError: boolean = false;

  error: string = null;
  user: User = null;

  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showError = true;
      } else {
        this.user = authState.user;
      }
    });
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(AuthActions.loginStart(
      {
        payload: {
          email: this.email,
          passsword: this.password
        }
      }
    ));
    form.reset();
  }

  onErrorButtonClicked() {
    this.showError = false;
  }
}
