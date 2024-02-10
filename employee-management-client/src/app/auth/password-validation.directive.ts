import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { Subscription } from "rxjs";

@Directive({
    selector:'[app-password-validation]',
    providers: [{provide: NG_VALIDATORS, useExisting: PasswordValidationDirective, multi: true}]
})
export class PasswordValidationDirective implements Validator {
    @Input('app-password-validation') confirmPassword: string = '';
    private subscription: Subscription = new Subscription();
     

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        if (!control.parent || !control) {
            return null;
          }

          const password = control.root.get(this.confirmPassword);
          const confirmPassword = control;

        
      
          if (!password || !confirmPassword) {
            return null;
          }
      
          if (confirmPassword.value === '') {
            return null;
          }
      
          if (password.value !== confirmPassword.value) {
            return { 'notMatching': true };
          }
      
          return null;
    }
}
