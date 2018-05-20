import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private account: any = {};
  private firstTime: boolean = true;
  private errorMessage: string = "";
  private loading = false;

  constructor(private httpService: HttpService, private loginService: LoginService) { }

  ngOnInit() {
    this.account = {
      username: "",
      password: ""
    }
  }

  login() {
    this.firstTime = false;
    if (this.account.username != "" && this.account.password != "") {
      this.loading = true;
      this.loginService.login(this.account.username, this.account.password,
        (message: string) => { this.errorMessage = message; this.loading = false; });
    }
    else {
      this.errorMessage = "Faltan campos a introducir";
    }
  }
}