import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-registers-view',
  templateUrl: './medical-registers-view.component.html',
  styleUrls: ['./medical-registers-view.component.css']
})
export class MedicalRegistersViewComponent implements OnInit {

  private registers: any[];
  constructor(private httpService: HttpService,private router: Router) { }

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
<<<<<<< HEAD
=======
  
  createMedicalConsultation() {
    this.router.navigateByUrl("/medicalConsultation/crud/ create")
  }

>>>>>>> 1626a2e1c29077e1be4011458505916be2547e69
}

