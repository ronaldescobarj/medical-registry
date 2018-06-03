import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';

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
  private loading: boolean = false;
  maxUsers: boolean = false;
  notAllowed: boolean = false;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.firstTime = true;

    this.nameError = false;
    this.nameValidator = true;
    this.lastNameError = false;
    this.lastNameValidator = true;
    this.dateError = false;
    let accountId = JSON.parse(localStorage.getItem('currentAccount')).id;
    this.action = this.route.snapshot.paramMap.get('action');
    if (this.action == "edit") {
      this.userId = this.route.snapshot.paramMap.get('id');
      this.httpService.get('/user/get?id=' + this.userId + '&accountId=' + accountId)
        .subscribe((response: any) => {
          if (response.success) {
            if (response.response.id) {
              this.user = response.response;
              this.user.birthdate = {
                date:
                  {
                    year: parseInt(this.user.birthdate.slice(0, 4)),
                    month: parseInt(this.user.birthdate.slice(5, 7)),
                    day: parseInt(this.user.birthdate.slice(8, 10)),
                  }
              };
            }
            else {
              this.notAllowed = true;
            }
            this.show = true;
          }
        });
    }
    if (this.action == "create") {
      this.httpService.get('/user/list?accountId=' + JSON.parse(localStorage.getItem('currentAccount')).id)
        .subscribe((response: any) => {
          if (response.success) {
            this.firstUser = response.response.length == 0;
            if (response.response.length >= 4) {
              this.maxUsers = true;
            }
          }
          this.user = {
            name: "",
            last_name: "",
            account_id: JSON.parse(localStorage.getItem('currentAccount')).id
          }
          this.show = true;
        })
    }
  }

  saveChanges() {
    let apiRoute = "";
    if (this.validate()) {
      if (this.action == "create") {
        this.user.default_user = this.firstUser;
        apiRoute = "create";
        this.user.id = Math.floor(Math.random() * 100000);
      }
      if (this.action == "edit") {
        apiRoute = "update";
      }
      this.loading = true;
      this.user.birthdate = this.user.birthdate.date.year + '-' + this.user.birthdate.date.month
        + '-' + this.user.birthdate.date.day;
      this.httpService.post('/user/' + apiRoute, this.user).subscribe((response: any) => {
        if (response.success) {
          this.goBack();
        }
        this.loading = false;
      })
    }
  }

  goBack() {
    if (localStorage.getItem('currentUser')) {
      if (this.notAllowed) {
        this.router.navigateByUrl('/registers');
      }
      else {
        this.router.navigateByUrl('/viewUser/' + this.userId);
      }
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
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    openSelectorOnInputClick: true,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    todayBtnTxt: "Hoy",
    monthLabels: { 1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre' },
    selectorHeight: "232px",
    selectorWidth: "350px"
  };

}
