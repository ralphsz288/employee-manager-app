import { NgModule } from "@angular/core";
import { MyTeamsComponent } from "./teams/my-teams/my-teams.component";
import { ManagedTeamsComponent } from "./teams/managed-teams/managed-teams.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";
import { CoreRoutingModule } from "./core-routing-module";
import { RouterModule } from "@angular/router";
import { CoreComponent } from "./core.component";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AddTeamDialogComponent } from "./components/dialog/add-team-dialog/add-team-dialog.component";
import { AddUserDialogComponent } from "./components/dialog/add-user-dialog/add-user-dialog.component";
import { DeleteUserDialogComponent } from './components/dialog/delete-user-dialog/delete-user-dialog.component';
import { DeleteTeamDialogComponent } from './components/dialog/delete-team-dialog/delete-team-dialog.component';
import { SearchMemberFilterPipe } from './components/search-bar/pipe/search-member-filter.pipe';


@NgModule({
    declarations: [
        MyTeamsComponent,
        ManagedTeamsComponent,
        CoreComponent,
        SearchBarComponent,
        AddTeamDialogComponent,
        AddUserDialogComponent,
        DeleteUserDialogComponent,
        DeleteTeamDialogComponent,
        SearchMemberFilterPipe
    ],
    imports: [
        CoreRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        SharedModule,
        RouterModule,
    ]
})
export class CoreModule{}