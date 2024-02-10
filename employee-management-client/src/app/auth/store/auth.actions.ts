import { createAction, props } from "@ngrx/store";

export const signUpStart = createAction(
    '[Auth] Sign up start',
    props<{
        payload: {
            firstName: string,
            lastName: string,
            email: string,
            password: string,
            role: string
        }
    }>()
)
