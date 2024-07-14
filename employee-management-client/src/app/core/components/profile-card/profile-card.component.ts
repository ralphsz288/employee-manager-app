import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../dialog/delete-user-dialog/delete-user-dialog.component';
import { User } from '../../../auth/user.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
  @Input() user: User;
  @Input() showDeleteButton: boolean;

  constructor(private dialog: MatDialog){}

  openDeleteUserDialog() { 
    this.dialog.open(
      DeleteUserDialogComponent, 
      {
        width: '300px',
        data: {
          teamId: 0,
          userId: this.user.id
        }
      }
    );
  }
}
