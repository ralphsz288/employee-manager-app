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

export const signUpSuccess = createAction(
    '[Auth] Sign up success',
    props<{
        payload: {
            id: string,
            firstName: string,
            lastName: string,
            email: string,
            imageUrl: string,
            role: string,
            isEnabled: boolean
        }
    }>()
)
export const loginStart = createAction(
    '[Auth] Login start',
    props<{
        payload: {
            email: string,
            passsword: string,
        }
    }>()
)

export const loginSuccess = createAction(
    '[Auth] Login success',
    props<{
        payload: {
            token: string,
            user: {
                id: string,
                firstName: string,
                lastName: string,
                email: string,
                imageUrl: string,
                role: string,
                isEnabled: boolean
            }
        }
    }>()
)

export const authenticationFail = createAction(
    '[Auth] Error',
    props<{
        payload: {
            error: string,
        }
    }>()
)
