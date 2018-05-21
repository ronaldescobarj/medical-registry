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
  }

  deleteUser(user: any) {
    this.httpService.post('/user/delete', user).subscribe((response: any) => {
      if (response.success) {
        console.log("borrado exitosamente");
        location.reload();
      }
    })
  }

}