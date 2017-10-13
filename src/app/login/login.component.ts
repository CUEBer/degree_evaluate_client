import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) {
  }

  login(username: string, password: string): boolean {
    this.authService.login(username, password);
    return false;
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }

}
