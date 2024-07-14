import { Component, OnInit } from '@angular/core';
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
export class MyTeamsComponent implements OnInit {
  private userStoreSub: Subscription;
  private storeSub: Subscription;
  isLoading: boolean = true;
  error: string = null;
  showError: boolean = false;
  teams: Team[];
  teamOwner: User;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(TeamsActions.getTeamsStart());
    this.storeSub = this.store.select('teams').subscribe(teamsState => {
      this.isLoading = teamsState.loading;
      this.error = teamsState.error;
      if (this.error) {
        this.showError = true;
      }
      if (teamsState.teams!! && teamsState.teams.length > 0) {
        this.teams = [...teamsState.teams];
        const owner = this.teams[0].owner;
        this.teamOwner = new User(
          owner.id,
          owner.firstName,
          owner.lastName,
          owner.email,
          owner.imageUrl,
          owner.role
        );
      }
    });
  }

  onSelectTeam(index:number) {
    [this.teams[0], this.teams[index]] = [this.teams[index], this.teams[0]];
    const owner = this.teams[0].owner;
    this.teamOwner = new User(
      owner.id,
      owner.firstName,
      owner.lastName,
      owner.email,
      owner.imageUrl,
      owner.role
    );
  }
}
