import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent implements OnInit {

  private firstTime: boolean;
  private account: any = {};
  private errorMessage: string;
  private loading: boolean = false;

  private usernameError: boolean;
  private passwordError: boolean;
  private passwordConfirmError: boolean;
  private usernameValidator: boolean;
  private passwordValidator: boolean;
  private passwordConfirmValidator: boolean;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.account = {
      username: "",
      password: "",
      passwordConfirm: ""
    }
    this.firstTime = true;
    this.loading = false;
    this.passwordConfirmError = false;
    this.passwordError = false;
    this.usernameError = false;
    this.passwordValidator = true;
    this.passwordConfirmValidator = true;
    this.usernameValidator = true;
  }

  register() {
    if (this.validate()) {
      this.loading = true;
      this.account.id = Math.floor(Math.random() * 100000);
      this.httpService.post('/account/create', this.account).subscribe((response: any) => {
        if (response.success) {
          this.router.navigateByUrl('/login');
        }
        else {
          this.errorMessage = response.message;
        }
        this.loading = false;
      })
    }
  }

  validate() {
    let res = true;
    this.firstTime = false;
    if (this.account.password == "") {
      this.passwordError = true;
      this.passwordValidator = false;
      res = false;
    } else {
      this.passwordError = false;
      this.passwordValidator = true;
    }

    if (this.account.username == "") {
      this.usernameError = true;
      this.usernameValidator = false;
      res = false;
    } else {
      this.usernameError = false;
      this.usernameValidator = true;
    }

    if (this.account.passwordConfirm == "") {
      this.passwordConfirmError = true;
      this.passwordConfirmValidator = false;
      res = false;
    } else {
      this.passwordConfirmError = false;
      this.passwordConfirmValidator = true;
    }
    return res;
  }

  borderColor(type: any) {
    if (type == 'password') {
      if (!this.firstTime && (!this.passwordValidator || this.passwordError))
        return 'tomato'
    }
    if (type == 'username') {
      if (!this.firstTime && (!this.usernameValidator || this.usernameError))
        return 'tomato'
    }
    if (type == 'passwordConfirm') {
      if (!this.firstTime && (!this.passwordConfirmValidator || this.passwordConfirmError))
        return 'tomato'
    }
    return "";
  }

}
