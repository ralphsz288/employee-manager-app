import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  onSubmit(form: NgForm){}
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit(): void {
  }
}
