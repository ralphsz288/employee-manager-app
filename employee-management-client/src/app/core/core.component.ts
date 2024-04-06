import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../auth/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.css'
})
export class CoreComponent implements OnInit {
  private userSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }
  ngOnInit(): void {

  }
}
