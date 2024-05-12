import { createReducer, on } from "@ngrx/store";
import { Team } from "../model/team.model";
import { addTeam, addTeamSuccess, getManagedTeamsStart, getManagedTeamsSuccess, getTeamsStart, getTeamsSuccess } from "./teams.actions";

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
    on(getTeamsStart, (state) => {
        return {
            ...state,
            error: null,
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
    on(getManagedTeamsStart, (state) => {
        return {
            ...state,
            error: null,
            loading: true
        }
    }),
    on(getManagedTeamsSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            managedTeams: action.payload.managedTeams
        }
    }),
    on(addTeam, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),
    on(addTeamSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            error: null,
            managedTeams: [...state.managedTeams, action.payload.team]
        }
    }),
)
