import { createReducer, on } from "@ngrx/store";
import { Team } from "../model/team.model";
import { getTeamsStart, getTeamsSuccess } from "./teams.actions";

export interface State {
    teams: Team[],
    managedTeams: Team[],
    error: string | null,
    loading: boolean
}

const initialState: State = {
    teams: [],
    managedTeams: [],
    error: null,
    loading: false
}

export const teamsReducer = createReducer(
    initialState,
    on(getTeamsStart, (state, action) => {
        return {
            ...state,
            authError: null,
            loading: true
        }
    }),
    on(getTeamsSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            teams: action.payload.teams
        }
    }),
)