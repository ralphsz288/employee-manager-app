import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions'
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { catchError, of, switchMap, tap } from "rxjs";
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
                console.log(data);
                return this.http.post<any>(
                    'http://localhost:8080/employee.management/user/register',
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
                    })
                )
            })
        ))
}
