import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions'
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import {environment} from '../../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {

    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private store: Store<fromApp.AppState>,
        private router: Router
    ){}

    authSignUp = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.signUpStart),
            switchMap((data) => {
                return this.http.post<any>(
                    environment.auth.registerUrl,
                    {
                        firstName: data.payload.firstName,
                        lastName: data.payload.lastName,
                        email: data.payload.email,
                        password: data.payload.password,
                        role: data.payload.role
                    }
                ).pipe(
                    map((res) => {
                        return AuthActions.signUpSuccess(
                            {
                                payload: {
                                    id: res.id,
                                    firstName: res.firstname,
                                    lastName: res.lastName,
                                    email: res.email,
                                    imageUrl: res.imageUrl,
                                    role: res.role,
                                    isEnabled: res.isEnabled,
                                }
                            }
                        )
                    }),
                    catchError((error) => {
                        return of(AuthActions.authenticationFail({payload: error.error}))
                    }) 
                )
            })
        )
    )

    authLogin = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginStart),
            switchMap((data) => {
                console.log(data);
                return this.http.post<any>(
                    environment.auth.loginUrl,
                    {
                        email: data.payload.email,
                        password: data.payload.passsword
                    }
                ).pipe(
                    map((res) => {
                        console.log(res);
                        return AuthActions.loginSuccess(
                            {
                                payload: {
                                    token: res.token,
                                    user: {
                                        id: res.id,
                                        firstName: res.userDto.firstname,
                                        lastName: res.userDto.lastName,
                                        email: res.userDto.email,
                                        imageUrl: res.userDto.imageUrl,
                                        role: res.userDto.role,
                                        isEnabled: res.userDto.isEnabled,
                                    }
                                }
                            }
                        )
                    }),
                    catchError((error) => {
                        return of(AuthActions.authenticationFail({payload: error.error}))
                    }) 
                )
            }) 
        )
    )

    authLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
            this.router.navigateByUrl('/path-to-navigate-to-after-success');
        })
    ),
    { dispatch: false }
);


}
