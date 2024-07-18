import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { searchTextChanged } from '../../teams/store/teams.actions';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchText: string = null;
  private searchTextChanged = new Subject<string>();

  constructor(private store: Store<fromApp.AppState>) {
    this.searchTextChanged.pipe(
      debounceTime(150),  // Debounce the input for 300ms
      distinctUntilChanged()  // Only emit if value is different from the last
    ).subscribe(model => {
      this.store.dispatch(searchTextChanged({payload: {text: model}}));
    });
  }

  onSearchTextChanged() {
    this.searchTextChanged.next(this.searchText);
  }
}
