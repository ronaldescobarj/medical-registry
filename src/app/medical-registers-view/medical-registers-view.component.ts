import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Location } from '@angular/common';
// import { ENETDOWN } from 'constants';
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
  private p: number = 1;
  private subscription: Subscription;
  constructor(private httpService: HttpService, private router: Router, private location: Location) { }

  ngOnInit() {
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
    // this.registers = [
    //   { date: 'October 13, 2014 11:13:00', summary: 'tenia dolor', type: 'consulta medica' },
    //   { date: 'October 14, 2014 11:13:00', summary: 'me siento mejor sin ir', type: 'observacion' },
    //   { date: 'October 15, 2014 11:13:00', summary: ' el doctor me dijo', type: 'observacion' },
    //   { date: 'October 16, 2014 11:13:00', summary: 'analisis de sangre', type: 'analisis' },
    //   { date: 'October 13, 2014 11:13:00', summary: 'tenia dolor', type: 'consulta medica' },
    //   { date: 'October 14, 2014 11:13:00', summary: 'me siento mejor sin ir', type: 'observacion' },
    //   { date: 'October 15, 2014 11:13:00', summary: ' el doctor me dijo', type: 'observacion' },
    //   { date: 'October 16, 2014 11:13:00', summary: 'analisis de sangre', type: 'analisis' },
    //   { date: 'October 13, 2014 11:13:00', summary: 'tenia dolor', type: 'consulta medica' },
    //   { date: 'October 14, 2014 11:13:00', summary: 'me siento mejor sin ir', type: 'observacion' },
    //   { date: 'October 15, 2014 11:13:00', summary: ' el doctor me dijo', type: 'observacion' },
    //   { date: 'October 16, 2014 11:13:00', summary: 'analisis de sangre', type: 'analisis' },
    //   { date: 'October 13, 2014 11:13:00', summary: 'tenia dolor', type: 'consulta medica' },
    //   { date: 'October 14, 2014 11:13:00', summary: 'me siento mejor sin ir', type: 'observacion' },
    //   { date: 'October 15, 2014 11:13:00', summary: ' el doctor me dijo', type: 'observacion' },
    //   { date: 'October 16, 2014 11:13:00', summary: 'analisis de sangre', type: 'analisis' },
    //   { date: 'October 13, 2014 11:13:00', summary: 'tenia dolor', type: 'consulta medica' },
    //   { date: 'October 14, 2014 11:13:00', summary: 'me siento mejor sin ir', type: 'observacion' },
    //   { date: 'October 15, 2014 11:13:00', summary: ' el doctor me dijo', type: 'observacion' },
    //   { date: 'October 16, 2014 11:13:00', summary: 'analisis de sangre', type: 'analisis' },
    //   { date: 'October 13, 2014 11:13:00', summary: 'tenia dolor', type: 'consulta medica' },
    //   { date: 'October 14, 2014 11:13:00', summary: 'me siento mejor sin ir', type: 'observacion' },
    //   { date: 'October 15, 2014 11:13:00', summary: ' el doctor me dijo', type: 'observacion' },
    //   { date: 'October 16, 2014 11:13:00', summary: 'analisis de sangre', type: 'analisis' },
    //   { date: 'October 13, 2014 11:13:00', summary: 'tenia dolor', type: 'consulta medica' },
    //   { date: 'October 14, 2014 11:13:00', summary: 'me siento mejor sin ir', type: 'observacion' },
    //   { date: 'October 15, 2014 11:13:00', summary: ' el doctor me dijo', type: 'observacion' },
    //   { date: 'October 16, 2014 11:13:00', summary: 'analisis de sangre', type: 'analisis' },
    //   { date: 'October 13, 2014 11:13:00', summary: 'tenia dolor', type: 'consulta medica' },
    //   { date: 'October 14, 2014 11:13:00', summary: 'me siento mejor sin ir', type: 'observacion' },
    //   { date: 'October 15, 2014 11:13:00', summary: ' el doctor me dijo', type: 'observacion' },
    //   { date: 'October 16, 2014 11:13:00', summary: 'analisis de sangre', type: 'analisis' },
    //   { date: 'October 13, 2014 11:13:00', summary: 'tenia dolor', type: 'consulta medica' },
    //   { date: 'October 14, 2014 11:13:00', summary: 'me siento mejor sin ir', type: 'observacion' },
    //   { date: 'October 15, 2014 11:13:00', summary: ' el doctor me dijo', type: 'observacion' },
    //   { date: 'October 16, 2014 11:13:00', summary: 'analisis de sangre', type: 'analisis' },
    //   { date: 'October 13, 2014 11:13:00', summary: 'tenia dolor', type: 'consulta medica' },
    //   { date: 'October 14, 2014 11:13:00', summary: 'me siento mejor sin ir', type: 'observacion' },
    //   { date: 'October 15, 2014 11:13:00', summary: ' el doctor me dijo', type: 'observacion' },
    //   { date: 'October 16, 2014 11:13:00', summary: 'analisis de sangre', type: 'analisis' },
    // ];

    // this.originalRegisters = this.registers;
  }

  sortRegisters(value: any) {
    // 0 default, 1 up, 2 down
    if (this.registers) {
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
    } else {
      if (this.sort[value] != 2)
        this.sort[value]++;
      else
        this.sort[value] = 0;
    }
  }

  viewRegister(register: any) {
    let type = "";
    switch (register.type) {
      case "Consulta":
        type = "/medicalConsultation";
        break;
      case "Analisis":
        type = "/medicalAnalysis";
        break;
      default:
        type = "/medicalSelfObservation";
        break;
    }
    this.router.navigateByUrl(type + "/" + register.id);
  }

  createRegister(type: string) {
    this.router.navigateByUrl(type + "/crud/create")
  }

  editRegister(register: any) {
    let type = "";
    switch (register.type) {
      case "Consulta":
        type = "/medicalConsultation";
        break;
      case "Analisis":
        type = "/medicalAnalysis";
        break;
      default:
        type = "/medicalSelfObservation";
        break;
    }
    this.router.navigateByUrl(type + "/crud/edit/" + register.id);
  }

  deleteRegister(register: any) {
    let type = "";
    switch (register.type) {
      case "Consulta":
        type = "/consultation";
        break;
      case "Analisis":
        type = "/analysis";
        break;
      default:
        type = "/selfObservation";
        break;
    }
    type = type + "/delete";
    this.httpService.post(type, register).subscribe((response: any) => {
      if (response.success) {
        if (type == "/analysis") {
          this.httpService.post('/image/delete', { analysis_id: register.id }).subscribe((res: any) => {
            if (res.success)
              location.reload();
          })
        }
        else
          location.reload();
      }
    })
  }

  test(textField: any) {
    this.registers = this.originalRegisters;
    let temp: any = [];
    this.registers.forEach((register: any) => {
      if ((register.date.includes(
        textField) || register.summary.includes(textField) || register.type.includes(textField)
      )) {
        temp.push(register);
      }
      else {
        return false;
      }
    }
    );
    this.registers = temp;
    if (this.sort.date != 0) {
      if (this.sort.date == 2) {
        this.registers.sort((a, b) => {
          a = new Date(a.date);
          b = new Date(b.date);
          return a > b ? -1 : a < b ? 1 : 0;
        });
      } else {
        this.registers.sort((a, b) => {
          a = new Date(a.date);
          b = new Date(b.date);
          return a < b ? -1 : a > b ? 1 : 0;
        });
      }
    }
    if (this.sort.type != 0) {
      if (this.sort.data == 1) {
        this.registers.sort((a, b) => {
          a = a.type;
          b = b.type;
          return a < b ? -1 : a > b ? 1 : 0;
        });
      } else {
        this.registers.sort((a, b) => {
          a = a.type;
          b = b.type;
          return a > b ? -1 : a < b ? 1 : 0;
        });
      }
    }
  }

  refresh() {
    location.reload();
  }
}