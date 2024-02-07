import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  last_name: string = '';
  first_name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  
  onSubmit(form: NgForm) {
    console.log(form.value);
    form.reset();
  }
}
