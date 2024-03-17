import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.css'
})
export class CoreComponent implements OnInit{
  constructor(private cookieService: CookieService){}
  ngOnInit(): void {
    // this.cookieService.set('user','');
    console.log(this.cookieService.get('user'));
    console.log(this.cookieService.get('user') == '');
    const user = new User (
      'abc',
      'ralph',
      'szakacs',
      'rakph28@gmail.com',
      '',
      'ADMIN',
  )
    const userDetails = {
      user: user,
      token: 'tokennnn'
    }
    this.cookieService.set('user',JSON.stringify(userDetails));
    console.log(this.cookieService.get('user'));
  }
}
