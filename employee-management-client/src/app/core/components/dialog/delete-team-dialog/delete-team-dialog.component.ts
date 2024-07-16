import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as TeamsActions from '../../../../core/teams/store/teams.actions';


@Component({
  selector: 'app-delete-team-dialog',
  templateUrl: './delete-team-dialog.component.html',
  styleUrl: './delete-team-dialog.component.css'
})
export class DeleteTeamDialogComponent {

  constructor(
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<DeleteTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteTeam(): void {
    this.store.dispatch(TeamsActions.deleteTeam({
      payload: {
        teamId: this.data.team.id,
      }
    }))
    this.dialogRef.close();
  }
}
