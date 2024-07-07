import { createAction, props } from "@ngrx/store"
import { Team } from "../model/team.model"

export const getTeamsStart = createAction(
    '[Teams] Get teams start',
)

export const getTeamsSuccess = createAction(
    '[Teams] Get teams success',
    props<{
        payload: {
            teams: Team[]
        }
    }>()
)

export const getManagedTeamsStart = createAction(
    '[Teams] Get managed teams start',
)

export const getManagedTeamsSuccess = createAction(
    '[Teams] Get managed teams success',
    props<{
        payload: {
            managedTeams: Team[]
        }
    }>()
)

export const addTeam = createAction(
    '[Teams] Add team',
    props<{
        payload: {
            name: string
        }
    }>()
)

export const addTeamSuccess = createAction(
    '[Teams] Add team success',
    props<{
        payload: {
            team: Team  
        }
    }>()
)

export const requestError = createAction(
    '[Teams] Error',
    props<{
        payload: {
            error: any  
        }
    }>()
)

export const addMember = createAction(
    '[Teams] Add Member',
    props<{
        payload: {
            teamId: string,
            userEmail: string
        }
    }>()
)

export const addMemberSuccess = createAction(
    '[Teams] Sent member request success',
    props<{
        payload: {
            responseMessage: string
        }
    }>()
)
