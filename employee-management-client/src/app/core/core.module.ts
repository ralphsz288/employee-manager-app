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
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@NgModule({
    declarations: [
        MyTeamsComponent,
        ManagedTeamsComponent,
        CoreComponent,
        ProfileCardComponent,
        SearchBarComponent,
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