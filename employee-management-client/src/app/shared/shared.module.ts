import { CommonModule } from "@angular/common";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddTeamDialogComponent } from './dialog/add-team-dialog/add-team-dialog.component';
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { AddUserDialogComponent } from './dialog/add-user-dialog/add-user-dialog.component';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        HeaderComponent,
        AddTeamDialogComponent,
        AddUserDialogComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule
    ],
    exports: [
        LoadingSpinnerComponent,
        HeaderComponent,
        CommonModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
    ],
})
export class SharedModule {}