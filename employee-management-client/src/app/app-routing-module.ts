import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { MyTeamsComponent } from "./core/teams/my-teams/my-teams.component";

const appRoutes: Routes = [
    // {path: '', redirectTo: '/auth', pathMatch: 'full'},
    {
        path: '',
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
    },
    { path: '**', component: MyTeamsComponent }
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
