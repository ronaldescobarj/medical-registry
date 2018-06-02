import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(private httpService: HttpService, private router: Router) { }

  login(username: string, password: string, callback: any) {
    this.httpService.get('/account/authenticate?username=' + username + '&password=' + password)
      .subscribe((response: any) => {
        console.log(response);
        callback(response.message);
        if (response.success) {
          localStorage.setItem('currentAccount', JSON.stringify(response.response.account));
          if (response.response.user) {
            console.log("entra if");
            localStorage.setItem('currentUser', JSON.stringify(response.response.user));
            this.router.navigateByUrl('/registers');
          }
          else {
            console.log("entra else");
            this.router.navigateByUrl('/users');
          }
        }
      })
  }

  logout() {
    localStorage.removeItem('currentAccount');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
