import { Injectable } from '@angular/core';
import { User } from '../../auth/user.model';
import { filter } from 'rxjs';
import { SearchMemberFilterPipe } from '../components/search-bar/pipe/search-member-filter.pipe';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private searchFilterPipe: SearchMemberFilterPipe
  ) {}

  filter(teamOwner: User, team: User[], searchText:string) {
    const ownerFilter = this.searchFilterPipe.transform({ members: [teamOwner], searchText: searchText });
    teamOwner = ownerFilter[0];
    team = this.searchFilterPipe.transform({ members: team, searchText: searchText });
    return {
      teamOwner: teamOwner, 
      team: team
    }
  }
}
