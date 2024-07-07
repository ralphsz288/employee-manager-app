import { createReducer, on } from "@ngrx/store";
import { Team } from "../model/team.model";
import { addMemberSuccess, addTeam, addTeamSuccess, getManagedTeamsStart, getManagedTeamsSuccess, getTeamsStart, getTeamsSuccess, requestError } from "./teams.actions";

export interface State {
    teams: Team[],
    managedTeams: Team[],
    error: string | null,
    loading: boolean,
    responseMessage: string | null,
}

const initialState: State = {
    teams: [],
    managedTeams: [],
    error: null,
    loading: false,
    responseMessage: null
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

    on(requestError, (state, action) => {
        return {
            ...state,
            error: action.payload.error,
            loading: false,
        }
    }),

    on(addMemberSuccess, (state, action) => {
        return {
            ...state,
            error: null,
            loading: false,
            responseMessage: action.payload.responseMessage,
        }
    })
)
