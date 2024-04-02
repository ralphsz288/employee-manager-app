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
                        console.log(error);
                        // return of(AuthActions.authenticationFail({payload: error.error}))
                        return of(null)
                    })
                )
            })
        )
    );
}