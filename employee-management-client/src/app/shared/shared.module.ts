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

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        HeaderComponent,
        AddTeamDialogComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule
    ],
    exports: [
        LoadingSpinnerComponent,
        HeaderComponent,
        CommonModule,
        MatIconModule,
        MatDialogModule,
    ],
})
export class SharedModule {}