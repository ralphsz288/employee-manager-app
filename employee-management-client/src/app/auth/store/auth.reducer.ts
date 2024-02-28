import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import { authenticationFail, signUpStart, signUpSuccess } from "./auth.actions";

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
    }),
    on(signUpSuccess, (state, action) => {
        const user = new User (
            action.payload.id,
            action.payload.firstName,
            action.payload.lastName,
            action.payload.email,
            action.payload.imageUrl,
            action.payload.role,
        )
        return {
            ...state,
            authError: null,
            user: user,
            loading: false
        }
    }),
    on(authenticationFail, (state, action) => {
        return {
            ...state,
            authError: action.payload.error,
            loading: false
        }
    })
)
