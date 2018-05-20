import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(private httpService: HttpService, private router: Router) { }

  login(username: string, password: string, callback: any) {
    this.httpService.get('/account/authenticate?username=' + username + '&password=' + password)
      .subscribe((response: any) => {
        callback(response.message);
        if (response.success) {
          localStorage.setItem('currentUser', JSON.stringify(response.response));
          this.router.navigateByUrl('/registers');
        }
      })
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
