import { RouterModule, Routes } from "@angular/router";
import { MyTeamsComponent } from "./teams/my-teams/my-teams.component";
import { CoreComponent } from "./core.component";
import { ManagedTeamsComponent } from "./teams/managed-teams/managed-teams.component";
import { NgModule } from "@angular/core";
import { EntryPointComponent } from "./entry-point/entry-point.component";
import { canActivateCoreGuard } from "./core.guard";

const appRoutes: Routes = [
    {
        path: '', component: CoreComponent, children: [
            { path: '', redirectTo: 'my-teams',pathMatch:'full'},
            {
                path: 'my-teams',
                component: MyTeamsComponent,
                canActivate: [canActivateCoreGuard],
            },
            {
                path: 'managed-teams',
                component: ManagedTeamsComponent,
                canActivate: [canActivateCoreGuard],
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
