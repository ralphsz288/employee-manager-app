import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions'
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { EMPTY, catchError, map, of, switchMap, tap } from "rxjs";
import {environment} from '../../../environments/environment';
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { User } from "../user.model";

@Injectable()
export class AuthEffects {

    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private store: Store<fromApp.AppState>,
        private router: Router,
        private cookieService: CookieService
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
                return this.http.post<any>(
                    environment.auth.loginUrl,
                    {
                        email: data.payload.email,
                        password: data.payload.passsword
                    }
                ).pipe(
                    map((res) => {
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

    autoLogin = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.autoLogin),
            switchMap((data) => {
                var token = this.cookieService.get('token');
                if (!token) {
                    this.router.navigate(['auth/login']);
                    return EMPTY;
                } else {
                    token = JSON.parse(token);
                    token = 'Bearer ' + token;
                    const headers = new HttpHeaders({
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    });                    
                    return this.http.get<any>(
                        environment.auth.checkTokenUrl,
                        {headers: headers}
                    ).pipe(
                        tap((res) => {
                            // res = JSON.stringify(res);
                            var usr = this.cookieService.get('user');
                        }),
                        catchError((error) => {
                            console.log(error);
                            this.cookieService.delete('user');
                            this.cookieService.delete('token');
                            this.router.navigate(['auth/login']);
                            return of(null);
                        })
                    )
                }
            })
        ),{ dispatch: false }
    );

    authLoginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap((action) => {
                const user = new User (
                    action.payload.user.id,
                    action.payload.user.firstName,
                    action.payload.user.lastName,
                    action.payload.user.email,
                    action.payload.user.imageUrl,
                    action.payload.user.role,
                )
                this.cookieService.set('user',JSON.stringify(user),10);
                this.cookieService.set('token',JSON.stringify(action.payload.token),10);
                this.router.navigate(['my-teams']);
            })
        ),
        { dispatch: false }
    );
}
