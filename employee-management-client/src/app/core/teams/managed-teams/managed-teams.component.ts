import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducer';
import * as TeamsActions from '../../teams/store/teams.actions';
import { Store } from '@ngrx/store';
import { Team } from '../model/team.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddTeamDialogComponent } from '../../components/dialog/add-team-dialog/add-team-dialog.component';
import { User } from '../../../auth/user.model';
import { AddUserDialogComponent } from '../../components/dialog/add-user-dialog/add-user-dialog.component';
import { DeleteTeamDialogComponent } from '../../components/dialog/delete-team-dialog/delete-team-dialog.component';
 
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
  responseMessage: string = null;
  showError: boolean = false;
  showResponseMessage: boolean = false;
  isEditButtonPressed: boolean = false;

  constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.store.dispatch(TeamsActions.getManagedTeamsStart());
    this.storeSub = this.store.select('teams').subscribe(teamsState => {
      this.isLoading = teamsState.loading;
      this.error = teamsState.error;
      this.responseMessage = teamsState.responseMessage;
      if (this.error!!) {
        this.showError = true;
      }
      if (this.responseMessage!!) {
        this.showResponseMessage = true;
      }
      if (teamsState.managedTeams!! && teamsState.managedTeams.length > 0) {
        this.isEditButtonPressed = false;
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
      }
    );
  }

  openAddUserDialog() { 
    this.dialog.open(
      AddUserDialogComponent, 
      {
        width: '250px',
        data: {teamId: this.managedTeams[0].id}
      }
    );
  }

  openDeleteTeamDialog() { 
    this.dialog.open(
      DeleteTeamDialogComponent, 
      {
        width: '250px',
        data: {team: this.managedTeams[0]}
      }
    );
  }

  onSelectTeam(index:number) {
    this.store.dispatch(TeamsActions.selectManagedTeam(
      {
        payload: {index:index}
      }
    ))
  }

  onEditButtonPressed() {
    this.isEditButtonPressed = !this.isEditButtonPressed;
  }

  onErrorButtonClicked() {
    this.showError = false;
  }

  onRequestSentButtonClicked() {
    this.showResponseMessage = false;
  }
}
