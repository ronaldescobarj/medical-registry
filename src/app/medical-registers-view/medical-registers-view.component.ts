import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-medical-registers-view',
  templateUrl: './medical-registers-view.component.html',
  styleUrls: ['./medical-registers-view.component.css']
})
export class MedicalRegistersViewComponent implements OnInit {

  private registers: any[];
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
      this.httpService.get('/registers/list').subscribe((response: any) => {
          this.registers = response.response;

          this.registers.sort((a, b) => {
            a = new Date(a.date);
            b = new Date(b.date);
            return a>b ? -1 : a<b ? 1 : 0;
          })
      })
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
    this.router.navigateByUrl("/medicalConsultation/crud/create");
  }
  createMedicalAnalysis() {
    this.router.navigateByUrl("/medicalAnalysis/crud/create");
  }
  createMedicalSelfObservation() {
    this.router.navigateByUrl("/medicalSelfObservation/crud/create");
  }

  editRegister(register: any) {
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
    this.router.navigateByUrl(type + "/crud/edit/" + register.id);
  }

  deleteRegister(register: any) {
    let type = "";
    switch (register.type) {
      case "consultation":
        type = "/consultation";
        break;
      case "analysis":
        type = "/analysis";
        break;
      default:
        type = "/selfObservation";
        break;
    }
    type = type+"/delete";
    this.httpService.post(type,register).subscribe((response: any) => {
      console.log(response);
  })
  }

}

