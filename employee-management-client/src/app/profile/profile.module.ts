import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SharedModule } from "../shared/shared.module";
import { RequestAbsenceComponent } from './components/request-absence/request-absence.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfilePageComponent,
    RequestAbsenceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ProfileRoutingModule,
    RouterModule,
    SharedModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule
] 
})
export class ProfileModule { }
