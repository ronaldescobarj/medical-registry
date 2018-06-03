import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit {

  private userId: any;
  private action: any;
  private user: any = {};
  private show: boolean = false;

  private firstTime: boolean;
  private firstUser: boolean;

  private nameError: boolean;
  private lastNameError: boolean;
  private nameValidator: boolean;
  private lastNameValidator: boolean;
  private dateError: boolean;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.firstUser = false;
    this.firstTime = true;

    this.nameError = false;
    this.nameValidator = true;
    this.lastNameError = false;
    this.lastNameValidator = true;
    this.dateError = false;

    this.action = this.route.snapshot.paramMap.get('action');
    if (this.action == "edit") {
      this.userId = this.route.snapshot.paramMap.get('id');
      this.httpService.get('/user/get?id=' + this.userId).subscribe((response: any) => {
        if (response.success) {
          this.user = response.response;
          this.show = true;
        }
      });
    }
    if (this.action == "create") {
      if (this.route.snapshot.paramMap.get('id') == "firstUser") {
        this.firstUser = true;
      }
      this.show = true;
      this.user = {
        name: "",
        last_name: "",
        account_id: JSON.parse(localStorage.getItem('currentAccount')).id
      }
    }
  }

  saveChanges() {
    this.user.default_user = this.firstUser;
    let apiRoute = "";
    if (this.validate()) {
      if (this.action == "create") {
        apiRoute = "create";
        this.user.id = Math.floor(Math.random() * 100000);
      }
      if (this.action == "edit")
        apiRoute = "update";
      this.httpService.post('/user/' + apiRoute, this.user).subscribe((response: any) => {
        if (response.success) {
          this.goBack();
        }
      })
    }
  }

  goBack() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigateByUrl('/viewUser/' + this.userId);
    }
    else {
      this.router.navigateByUrl('/users');
    }
  }

  validate() {
    let res = true;
    this.firstTime = false;

    if (this.user.age < 0) {
      this.dateError = true;
      res = false;
    } else {
      this.dateError = false;
    }

    if (this.user.name == "") {
      this.nameError = true;
      this.nameValidator = false;
      res = false;
    } else {
      this.nameError = false;
      this.nameValidator = true;
    }

    if (this.user.last_name == "") {
      this.lastNameError = true;
      this.lastNameValidator = false;
      res = false;
    } else {
      this.lastNameError = false;
      this.lastNameValidator = true;
    }

    return res;
  }

  borderColor(isName: boolean) {
    if (isName) {
      if (!this.firstTime && (!this.nameValidator || this.nameError))
        return 'tomato'
    }
    else {
      if (!this.firstTime && (!this.lastNameValidator || this.lastNameError))
        return 'tomato'
    }
    return "";
  }

}
