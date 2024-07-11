import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as TeamsActions from '../../../../core/teams/store/teams.actions';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.css'
})
export class AddUserDialogComponent {
  userEmail: string;

  constructor(
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  //add sleected team as data from screen to dialog
  

  onAddUser(): void {
    if(this.userEmail!!) {
      this.store.dispatch(TeamsActions.addMember(
        {
          payload: {
            teamId: this.data.teamId,
            userEmail: this.userEmail
          }
        }
      ));
      this.dialogRef.close();
    }
  }
}
