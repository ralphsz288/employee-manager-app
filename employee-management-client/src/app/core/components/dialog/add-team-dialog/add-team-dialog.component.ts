import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fromApp from '../../../../store/app.reducer';
import * as TeamsActions from '../../../teams/store/teams.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrl: './add-team-dialog.component.css'
})
export class AddTeamDialogComponent {
  teamName: string;

  constructor(
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<AddTeamDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddTeam(): void {
    if(this.teamName!!) {
      this.store.dispatch(TeamsActions.addTeam(
        {
          payload: {
            name: this.teamName
          }
        }
      ));
      this.dialogRef.close();
    }
  }
}
