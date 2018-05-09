import { Component, OnInit , ViewChild} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-registers-view',
  templateUrl: './medical-registers-view.component.html',
  styleUrls: ['./medical-registers-view.component.css']
})
export class MedicalRegistersViewComponent implements OnInit {

  private registers: any[];
  @ViewChild('deleteModal') deleteModal: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.registers = [
      { id: 1, title: 'register1', type: 'consultation', date: '2018-05-05' },
      { id: 2, title: 'register2', type: 'analysis', date: '2018-05-06' },
      { id: 3, title: 'register3', type: 'self observation', date: '2018-05-07' },
    ];
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

