import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() role: string;
  @Input() email: string;
  @Input() imageUrl: string; // URL for the profile picture

  onDeletePressed() {
    console.log("delete pressed");
  }
}
