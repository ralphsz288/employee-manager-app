import { CommonModule } from "@angular/common";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ProfileCardComponent } from "./profile-card/profile-card.component";


@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        HeaderComponent,
        ProfileCardComponent,
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        MatIcon
    ],
    exports: [
        LoadingSpinnerComponent,
        HeaderComponent,
        CommonModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        ProfileCardComponent
    ],
})
export class SharedModule {}