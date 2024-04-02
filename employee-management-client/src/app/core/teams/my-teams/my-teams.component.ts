import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducer';
import * as TeamsActions from '../../teams/store/teams.actions';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { Team } from '../model/team.model';
import { User } from '../../../auth/user.model';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrl: './my-teams.component.css'
})
export class MyTeamsComponent implements AfterViewInit {
  private userStoreSub: Subscription;
  private storeSub: Subscription;
  isLoading: boolean = false;
  error: string = null;
  showError: boolean = false;
  teams: Team[];
  members: User[];

  ngAfterViewInit(): void {
    this.userStoreSub = this.store.select('auth')
      .pipe(
        map(
          state => {
            return state.user
          }
        )
      ).subscribe(user => {
        console.log(user);
        if (user !== null) {
          console.log(user);
          this.store.dispatch(TeamsActions.getTeamsStart());
        }
      });

    // this.storeSub = this.store.select('teams').subscribe(teamsState => {
    //   this.isLoading = teamsState.loading;
    //   this.error = teamsState.error;
    //   if (this.error) {
    //     this.showError = true;
    //   }
    //   if (teamsState.teams.length > 0) {
    //     console.log(teamsState.teams)
    //     this.teams = teamsState.teams;
    //     this.members = this.teams[0].members;
    //     console.log(this.members);
    //   }
    // });
  }

  constructor(private store: Store<fromApp.AppState>) { }
}
