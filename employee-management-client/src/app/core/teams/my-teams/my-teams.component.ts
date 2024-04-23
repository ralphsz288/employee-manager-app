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
export class MyTeamsComponent implements OnInit {
  private userStoreSub: Subscription;
  private storeSub: Subscription;
  isLoading: boolean = true;
  error: string = null;
  showError: boolean = false;
  teams: Team[];
  members: User[];
  selectedTeamIndex:number = 0;

  ngOnInit(): void {
    this.store.dispatch(TeamsActions.getTeamsStart());
    this.storeSub = this.store.select('teams').subscribe(teamsState => {
      this.isLoading = teamsState.loading;
      this.error = teamsState.error;
      if (this.error) {
        this.showError = true;
      }
      if (teamsState.teams.length > 0) {
        this.teams = [...teamsState.teams];
        this.members = this.teams[this.selectedTeamIndex].members;
        // this.teams = [
        //   new Team('1','team1',new User('a','b','c','d',null,'rol'),[]),
        //   new Team('1','team2',new User('a','b','c','d',null,'rol'),[]),
        //   new Team('1','team3',new User('a','b','c','d',null,'rol'),[]),
        //   new Team('1','team4',new User('a','b','c','d',null,'rol'),[]),
        //   new Team('1','team5',new User('a','b','c','d',null,'rol'),[]),
        //   new Team('1','team6',new User('a','b','c','d',null,'rol'),[]),
        //   new Team('1','team7',new User('a','b','c','d',null,'rol'),[]),
        //   new Team('1','team8',new User('a','b','c','d',null,'rol'),[]),
        //   new Team('1','team9',new User('a','b','c','d',null,'rol'),[]),
        //   new Team('1','team10',new User('a','b','c','d',null,'rol'),[]),
        //   new Team('1','team11',new User('a','b','c','d',null,'rol'),[]),
        //   new Team('1','team12',new User('a','b','c','d',null,'rol'),[])
        // ]
      }
    });
  }
  constructor(private store: Store<fromApp.AppState>) { }

  onSelectTeam(index:number) {
    [this.teams[0], this.teams[index]] = [this.teams[index], this.teams[0]];
    this.selectedTeamIndex = index;
    this.members = this.teams[this.selectedTeamIndex].members;  
  }
}
