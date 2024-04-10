import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouteConfigLoadEnd, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";

export const canActivateCoreGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const router = inject(Router);
    const store = inject(Store<fromApp.AppState>);
    return store.select('auth').pipe(
        take(1),
        switchMap(
            state => {
                console.log(state.user);
                state.user !== null ? true : false;
                if (state.user) {
                    return of(true);
                } else {
                    return of(false);
                }
            }
        )
    )
}
