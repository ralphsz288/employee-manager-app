import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Member } from '../model/member.model';
import * as fromApp from '../../../store/app.reducer';
import * as TeamsActions from '../../teams/store/teams.actions';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrl: './my-teams.component.css'
})
export class MyTeamsComponent implements AfterViewInit {
  private userSub: Subscription;
  ngAfterViewInit(): void {
    this.userSub = this.store.select('auth')
    .pipe(
      map(
        state => {
          return state.user
        }
      )
    ).subscribe(user => {
      if(user !== null) {
        this.store.dispatch(TeamsActions.getTeamsStart());
      }
    });
  }

  constructor(private store: Store<fromApp.AppState>){ }

  members: Member[] = [
    new Member("1","Ralph","Szakacs","ralph@email.com",'',"Developer"),
    new Member("2","User2","name","user2@email.com",'',"Designer"),
    new Member("3","User3","name","user3@email.com",'',"Manager"),
    new Member("4","User4","name","user4@email.com",'',"Developer"),
    new Member("5","User5","name","user5@email.com",'',"Developer"),
  ] 
}
