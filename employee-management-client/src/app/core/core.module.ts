import { NgModule } from "@angular/core";
import { MyTeamsComponent } from "./teams/my-teams/my-teams.component";
import { ManagedTeamsComponent } from "./teams/managed-teams/managed-teams.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";
import { CoreRoutingModule } from "./core-routing-module";
import { AppRoutingModule } from "../app-routing-module";
import { RouterModule } from "@angular/router";
import { CoreComponent } from "./core.component";
import { HeaderComponent } from "../shared/header/header.component";

@NgModule({
    declarations: [
        MyTeamsComponent,
        ManagedTeamsComponent,
        CoreComponent
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