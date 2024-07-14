import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromApp from '../../../store/app.reducer';
import * as TeamsActions from '../store/teams.actions';
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { environment } from "../../../../environments/environment";
import { CookieService } from "ngx-cookie-service";
import { Team } from "../model/team.model";
import { User } from "../../../auth/user.model";

@Injectable()
export class TeamsEffects {
    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private store: Store<fromApp.AppState>,
        private cookieService: CookieService,
    ) { }

    getTeams$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeamsActions.getTeamsStart),
            withLatestFrom(this.store.select('auth')),
            switchMap(([_, authState]) => {
                let params = new HttpParams();
                params = params.append('userId', authState.user.id);
                const headers = new HttpHeaders({
                    'Authorization': 'Bearer ' + authState.token,
                    'Content-Type': 'application/json'
                });
                return this.http.get<any>(
                    environment.teams.getTeamsByMember,
                    {
                        params: params,
                        headers: headers
                    },
                ).pipe(
                    map((res) => {
                        return TeamsActions.getTeamsSuccess(
                            {
                                payload: {
                                    teams: res
                                }
                            }
                        )
                    }),
                    catchError((error) => {
                        console.log(error.error);
                        return of(TeamsActions.requestError({payload: error.error}))
                    })
                )
            })
        )
    );

    getManagedTeams$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeamsActions.getManagedTeamsStart),
            withLatestFrom(this.store.select('auth')),
            switchMap(([_, authState]) => {
                let params = new HttpParams();
                params = params.append('userId', authState.user.id);
                const headers = new HttpHeaders({
                    'Authorization': 'Bearer ' + authState.token,
                    'Content-Type': 'application/json'
                });
                return this.http.get<any>(
                    environment.teams.getTeamsByOwner,
                    {
                        params: params,
                        headers: headers
                    },
                ).pipe(
                    map((res) => {
                        return TeamsActions.getManagedTeamsSuccess(
                            {
                                payload: {
                                    managedTeams: res
                                }
                            }
                        )
                    }), 
                    catchError((error) => {
                        console.log(error);
                        // return of(AuthActions.authenticationFail({payload: error.error}))
                        return of(null)
                    })
                )
            })
        )
    );

    addTeam$ = createEffect(() => 
        this.actions$.pipe(
            ofType(TeamsActions.addTeam),
            withLatestFrom(this.store.select('auth')),
            switchMap(([data,authState]) => {
                const headers = new HttpHeaders({
                    'Authorization': 'Bearer ' + authState.token,
                    'Content-Type': 'application/json'
                });
                const body = {
                    "name" : data.payload.name,
                    "owner" : authState.user.id
                }
                return this.http.post<any>(
                    environment.teams.createTeam,
                    body,
                    {
                        headers: headers
                    },
                ).pipe(
                    map((res) => {
                        const team: Team = new Team(
                            res.id,
                            data.payload.name,
                            authState.user,
                            []
                        );
                        return TeamsActions.addTeamSuccess(
                            {
                                payload: {
                                    team: team
                                }
                            }
                        );
                    }), 
                    catchError((error) => {
                        console.log(error);
                        return of(TeamsActions.requestError({payload: error.error}))
                    })
                )
            })
        )
    );

    addMember$ = createEffect(() => 
        this.actions$.pipe(
            ofType(TeamsActions.addMember),
            withLatestFrom(this.store.select('auth')),
            switchMap(([data,authState]) => {
                const headers = new HttpHeaders({
                    'Authorization': 'Bearer ' + authState.token,
                    'Content-Type': 'application/json'
                });
                const body = {
                    "teamId" : data.payload.teamId, 
                    "email" : data.payload.userEmail
                }
                return this.http.put<any>(
                    environment.teams.addUser,
                    body,
                    {
                        headers: headers
                    },
                ).pipe(
                    map((res) => {
                        console.log(res); 
                        return TeamsActions.addMemberSuccess(
                            {
                                payload: {
                                    responseMessage: res.message
                                }
                            }
                        );
                    }), 
                    catchError((error) => {
                        // console.log(error);
                        return of(TeamsActions.requestError({payload: error.error}))
                    })
                )
            })
        )
    );

    removeTeamMember$ = createEffect(()=>
        this.actions$.pipe(
            ofType(TeamsActions.removeTeamMember),
            withLatestFrom(this.store.select('auth')),
            switchMap(([data,authState]) => {
                const headers = new HttpHeaders({
                    'Authorization': 'Bearer ' + authState.token,
                    'Content-Type': 'application/json'
                });
                const body = {
                    "teamId" : data.payload.teamId, 
                    "userId" : data.payload.userId
                }
                return this.http.patch<any>(
                    environment.teams.removeTeamMember,
                    body,
                    {
                        headers: headers
                    },
                ).pipe(
                    map((res) => {
                        console.log(res); 
                        return TeamsActions.removeTeamMemberSuccess(
                            {
                                payload: {
                                    teamId: data.payload.teamId,
                                    userId: data.payload.userId
                                }
                            }
                        );
                    }), 
                    catchError((error) => {
                        // console.log(error);
                        return of(TeamsActions.requestError({payload: error.error}))
                    })
                )
            })
        )
    );
}
