import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login-interface';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: Login = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginObj).subscribe(
      response => {
        this.router.navigate(['./dashboard']);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

  refreshToken() {
    this.authService.refreshToken().subscribe(
      response => {
        this.router.navigate(['./dashboard']);
      },
      error => {
        console.error('Token refresh failed', error);
      }
    );
  }
}