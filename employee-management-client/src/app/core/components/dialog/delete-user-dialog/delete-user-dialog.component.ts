import { Component, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as TeamsActions from '../../../../core/teams/store/teams.actions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.css'
})
export class DeleteUserDialogComponent {
  
  constructor(
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteUser(): void {
    this.store.pipe(
      select('teams'),take(1)).
      subscribe(data => {
        console.log(data.managedTeams[0].id);
        console.log(this.data.userId)
        this.store.dispatch(TeamsActions.removeTeamMember({
          payload: {
            teamId: data.managedTeams[0].id,
            userId: this.data.userId
          }
        }))
    });
    this.dialogRef.close();
  }

}
