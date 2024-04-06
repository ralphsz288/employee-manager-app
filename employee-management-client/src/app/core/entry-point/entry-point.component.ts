import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrl: './entry-point.component.css'
})
export class EntryPointComponent implements OnInit {
  private userStoreSub: Subscription;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userStoreSub = this.store.select('auth')
      .pipe(
        map(
          state => {
            return state.user
          }
        )
      ).subscribe(user => {
        if (user == null) {
          this.store.dispatch(AuthActions.autoLogin());
        }
      });
  }

}
