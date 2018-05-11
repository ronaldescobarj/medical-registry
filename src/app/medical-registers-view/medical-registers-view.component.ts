import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Location } from '@angular/common';
import { ENETDOWN } from 'constants';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-medical-registers-view',
  templateUrl: './medical-registers-view.component.html',
  styleUrls: ['./medical-registers-view.component.css']
})
export class MedicalRegistersViewComponent implements OnInit {

  private registers: any[];
  private originalRegisters: any[];
  private arrowDownIcon: String;
  private arrowUpIcon: String;
  private sort: any;
  private subscription: Subscription;
  constructor(private httpService: HttpService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.registers = [];
    this.originalRegisters = [];
    this.sort = {
      type: 0,
      date: 0
    };
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = this.httpService.get('/registers/list').subscribe((response: any) => {
      if (response.success) {
        this.registers = response.response;
        this.registers.forEach((register: any) => this.originalRegisters.push(register));
      }
    })
  }

  sortRegisters(value: any) {
    // 0 default, 1 up, 2 down
    if (this.sort[value] == 0) {
      if (value == "date") {
        this.registers.sort((a, b) => {
          a = new Date(a[value]);
          b = new Date(b[value]);
          return a < b ? -1 : a > b ? 1 : 0;
        });
      }
      else {
        this.registers.sort((a, b) => {
          a = a[value];
          b = b[value];
          return a < b ? -1 : a > b ? 1 : 0;
        });
      }
      this.sort[value]++;
      let otherValue = value == "type" ? "date" : "type";
      this.sort[otherValue] = 0;
      return;
    }
    if (this.sort[value] == 1) {
      if (value == "date") {
        this.registers.sort((a, b) => {
          a = new Date(a[value]);
          b = new Date(b[value]);
          return a > b ? -1 : a < b ? 1 : 0;
        });
      }
      else {
        this.registers.sort((a, b) => {
          a = a[value];
          b = b[value];
          return a > b ? -1 : a < b ? 1 : 0;
        });
      }
      this.sort[value]++;
      return;
    }
    if (this.sort[value] == 2) {
      this.registers = [];
      this.originalRegisters.forEach((register: any) => this.registers.push(register));
      this.sort[value] = 0;
      return;
    }
  }

  viewRegister(register: any) {
    let type = "";
    switch (register.type) {
      case "consultation":
        type = "/medicalConsultation";
        break;
      case "analysis":
        type = "/medicalAnalysis";
        break;
      default:
        type = "/medicalSelfObservation";
        break;
    }
    this.router.navigateByUrl(type + "/" + register.id);
  }

  createMedicalConsultation() {
    this.router.navigateByUrl("/medicalConsultation/crud/create")
  }

  editRegister(register: any) {
    this.router.navigateByUrl('medicalConsultation/crud/edit/' + register.id);
  }

  deleteRegister(register: any) {
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = this.httpService.post('/consultation/delete', register).subscribe((response: any) => {
      console.log(response);
      window.location.reload();
    })
  }

}

