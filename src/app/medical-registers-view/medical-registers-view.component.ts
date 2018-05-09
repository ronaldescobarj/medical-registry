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
      this.httpService.get('registry/list').subscribe((response: any) => {
          this.registers = response.response;
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
    this.router.navigateByUrl("/medicalConsultation/crud/ create")
  }

}

