import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouteConfigLoadEnd, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { filter, map, switchMap, take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";

export const canActivateCoreGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const router = inject(Router);
    const store = inject(Store<fromApp.AppState>);
    const cookieService = inject(CookieService);
    return store.select('auth').pipe(
        take(1),
        switchMap(
            state => {
                console.log(state.user);
                if (!!state.user) {
                    return of(true);
                }
                const token = cookieService.get('token');
                if (!!token) {
                    console.log(token);
                    store.dispatch(AuthActions.activateGuardLogin());
                    return store.select('auth').pipe(
                        filter(updatedAuthState => !!updatedAuthState.user || updatedAuthState.guardLoginSent),
                        take(1),
                        map(updatedAuthState => updatedAuthState.user ? true : router.createUrlTree(['/auth/login']))
                    );
                }
                return of(router.createUrlTree(['/auth/login']));
            }
        )
    )
}
