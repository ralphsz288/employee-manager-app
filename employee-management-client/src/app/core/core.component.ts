import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../auth/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '..//auth/store/auth.actions';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.css'
})
export class CoreComponent implements OnInit{
  constructor(private store: Store<fromApp.AppState>){}
  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
    console.log('yes');
  }
}
