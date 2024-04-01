import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromTeams from '../core/teams/store/teams.reducer';

export interface AppState {
    auth: fromAuth.State;
    teams: fromTeams.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    teams: fromTeams.teamsReducer
}