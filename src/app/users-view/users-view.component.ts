import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  private users: any = [];
  private show = false;
  private accountId: any;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.accountId = JSON.parse(localStorage.getItem('currentAccount')).id;
    this.httpService.get('/user/list?accountId=' + this.accountId).subscribe((response: any) => {
      if (response.success) {
        this.users = response.response;
        this.show = true;
      }
    })
  }

  selectUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigateByUrl('/registers');
  }

  addUser() {
    if (this.users.length > 0)
      this.router.navigateByUrl('/user/create/#');
    else
      this.router.navigateByUrl('/user/create/firstUser');
  }

  deleteUser(user: any) {
    this.httpService.post('/user/delete', user).subscribe((response: any) => {
      if (response.success) {
        location.reload();
      }
    })
  }

  setDefault(newDefault: any) {
    let currentDefault = this.users.find((user: any) => {
      return user.default_user;
    });
    console.log(currentDefault);
    this.httpService.post('/user/changeDefault', { currentDefault: currentDefault, newDefault: newDefault })
      .subscribe((response: any) => {
        if (response.success) {
          location.reload();
        }
      })
  }

}