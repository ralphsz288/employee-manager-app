import { AfterContentInit, Component, OnInit } from '@angular/core';
import { User } from '../../../auth/user.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  	member: User;
	 

	ngOnInit(): void {
		this.member = new User("123","Ralph","Szakacs","rakph28@gmail.com","123","USER");
		console.log(this.member)
	}

	onRequestAbsence() {

	}
}
