import { CommonModule } from "@angular/common";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        HeaderComponent
    ],
    imports: [CommonModule],
    exports: [
        LoadingSpinnerComponent,
        HeaderComponent,
        CommonModule
    ],
})
export class SharedModule {}