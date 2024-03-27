import { createReducer } from "@ngrx/store";
import { Member } from "../model/member.model";
import { Team } from "../model/team.model";

export interface State {
    teams: Team[],
    managedTeams: Team[]
}

const initialState: State = {
    teams: [],
    managedTeams: []
}

const teamsReducer = createReducer(
    initialState,
)