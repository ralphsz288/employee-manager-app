import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions'
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import {environment} from '../../environments/environment';
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
                let url = 'http://localhost:8080/employee.management/user/register';
                console.log(url);
                console.log(data);
                return this.http.post<any>(
                    url,
                    {
                        firstName: data.payload.firstName,
                        lastName: data.payload.lastName,
                        email: data.payload.email,
                        password: data.payload.password,
                        role: data.payload.role
                    }
                ).pipe(
                    tap((res) => {
                        console.log(res);
                    }),
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
}
