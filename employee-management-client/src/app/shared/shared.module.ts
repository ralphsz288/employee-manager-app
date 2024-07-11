import { CommonModule } from "@angular/common";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        HeaderComponent,
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