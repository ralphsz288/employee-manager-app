import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducer';
import * as TeamsActions from '../../teams/store/teams.actions';
import { Store } from '@ngrx/store';
import { Team } from '../model/team.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddTeamDialogComponent } from '../../../shared/dialog/add-team-dialog/add-team-dialog.component';
import { User } from '../../../auth/user.model';
 
@Component({
  selector: 'app-managed-teams',
  templateUrl: './managed-teams.component.html',
  styleUrl: './managed-teams.component.css'
})
export class ManagedTeamsComponent implements AfterViewInit {
  isLoading: boolean = true;
  managedTeams: Team[];
  teamOwner: User;
  private storeSub: Subscription;
  error: string = null;
  showError: boolean = false;

  constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.store.dispatch(TeamsActions.getManagedTeamsStart());
    this.storeSub = this.store.select('teams').subscribe(teamsState => {
      this.isLoading = teamsState.loading;
      this.error = teamsState.error;
      if (this.error) {
        this.showError = true;
      }
      if (teamsState.managedTeams!! && teamsState.managedTeams.length > 0) {
        this.managedTeams = [...teamsState.managedTeams];
        const owner = this.managedTeams[0].owner;
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

  openAddTeamDialog() { 
    this.dialog.open(
      AddTeamDialogComponent, 
      {
        width: '250px',
        data: "right click"
      }
    );
  }

  onSelectTeam(index:number) {
    [this.managedTeams[0], this.managedTeams[index]] = [this.managedTeams[index], this.managedTeams[0]];
  }
}
