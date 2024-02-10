import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import { signUpStart } from "./auth.actions";

export interface State {
    user: User | null;
    token: string | null;
    authError: string | null;
    loading: boolean;
}

const initialState: State = {
    user: null,
    token: null,
    authError: null,
    loading: false
};

export const authReducer = createReducer(
    initialState,
    on(signUpStart, (state, action) => {
        return {
            ...state,
            authError: null,
            loading: true
        }
    })
)