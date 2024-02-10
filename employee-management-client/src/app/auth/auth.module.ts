import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing-module";
import { AuthComponent } from "./auth.component";
import { PasswordValidationDirective } from "./password-validation.directive";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        AuthComponent,
        PasswordValidationDirective
    ],
    imports: [
        AuthRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule
    ]
})
export class AuthModule{}