import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Medical Registry';


  constructor(private loginService: LoginService, private router: Router) {
  }

  loggedIn() {
    return localStorage.getItem('currentAccount');
  }

  changeUser() {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/users');
  }

  viewUser() {
    let userId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.router.navigateByUrl('/user/' + userId);
  }

  logout() {
    this.loginService.logout();
  }

}
