import { Component } from '@angular/core';
import { Member } from '../model/member.model';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrl: './my-teams.component.css'
})
export class MyTeamsComponent {
  members: Member[] = [
    new Member("1","Ralph","Szakacs","ralph@email.com",'',"Developer"),
    new Member("2","User2","name","user2@email.com",'',"Designer"),
    new Member("3","User3","name","user3@email.com",'',"Manager"),
    new Member("4","User4","name","user4@email.com",'',"Developer"),
    new Member("5","User5","name","user5@email.com",'',"Developer"),
  ] 
}
