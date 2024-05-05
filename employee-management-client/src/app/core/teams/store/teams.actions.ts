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
    '[Teams] Get teams start',
)

export const getManagedTeamsSuccess = createAction(
    '[Teams] Get teams success',
    props<{
        payload: {
            managedTeams: Team[]
        }
    }>()
)
