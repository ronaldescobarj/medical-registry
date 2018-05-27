import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-consultation-create',
  templateUrl: './medical-consultation-create.component.html',
  styleUrls: ['./medical-consultation-create.component.css']
})
export class MedicalConsultationCreateComponent implements OnInit {

  private medicalConsultation: any = {};

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.medicalConsultation = {
      id: "",
      summary: "",
      doctor: "",
      diagnostic: "",
      hospital: "",
      description: "",
      commentary: "",
      date: "",
      user_id: "",
    }
  }

  createConsultation() {
    this.medicalConsultation.id = Math.floor(Math.random() * 100000);
    this.medicalConsultation.user_id = JSON.parse(localStorage.getItem('currentUser')).id;
    this.httpService.post('/consultation/create', this.medicalConsultation).subscribe((response: any) => {
      if (response.success)
        this.router.navigateByUrl('/registers');
    })
  }

  goBack() {
    this.router.navigateByUrl('/registers');
  }

}
