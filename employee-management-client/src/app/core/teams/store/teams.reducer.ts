import { createReducer, on } from "@ngrx/store";
import { Team } from "../model/team.model";
import { addMemberSuccess, addTeam, addTeamSuccess, deleteTeam, deleteTeamSuccess, getManagedTeamsStart, getManagedTeamsSuccess, getTeamsStart, getTeamsSuccess, removeTeamMember, removeTeamMemberSuccess, requestError, selectManagedTeam } from "./teams.actions";

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
    }),

    on(selectManagedTeam, (state, action) => {
        let newTeams = [...state.managedTeams];
        [newTeams[0], newTeams[action.payload.index]] = [newTeams[action.payload.index], newTeams[0]];
        return { ...state, managedTeams: newTeams };
    }),

    on(removeTeamMember, (state, action) => {
        return {
            ...state,
            loading: false,
            error: null
        }
    }),

    on(removeTeamMemberSuccess, (state, action) => {
        const teamId = action.payload.teamId;
        const userId = action.payload.userId;
        const updatedManagedTeams = state.managedTeams.map(team => {
            if (team.id === teamId) {
                const updatedMembers = team.members.filter(member => member.id !== userId);
                return { ...team, members: updatedMembers };
            }
            return team;
        });
        
        return {
            ...state,
            loading: false,
            managedTeams: updatedManagedTeams,
            error: null
        }
    }),

    on(deleteTeam, (state, action) => {
        return {
            ...state,
            loading: false,
            error: null
        }
    }),

    on(deleteTeamSuccess, (state, action) => {
        const updatedManagedTeams = state.managedTeams.filter(team => team.id !== action.payload.teamId);
        return {
            ...state,
            loading: false,
            error: null,
            managedTeams: updatedManagedTeams
        }
    }),
)
