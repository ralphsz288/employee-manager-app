import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../../auth/user.model';

@Pipe({
  name: 'searchMemberFilter'
})
@Injectable({ providedIn: 'root' })
export class SearchMemberFilterPipe implements PipeTransform {
  transform(input: { members: User[], searchText: string }): User[] {
    if (!input.members) return [];
    if (!input.searchText) return input.members;

    const searchTextLower = input.searchText.toLowerCase();

    return input.members.filter(member =>
      member.firstName.toLowerCase().startsWith(searchTextLower) ||
      member.lastName.toLowerCase().startsWith(searchTextLower)
    );
  }
}

//make search work for My Teams and also filter the teamOwner