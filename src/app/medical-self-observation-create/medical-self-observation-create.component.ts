import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-medical-self-observation-create',
  templateUrl: './medical-self-observation-create.component.html',
  styleUrls: ['./medical-self-observation-create.component.css']
})
export class MedicalSelfObservationCreateComponent implements OnInit {

  private medicalSelfObservation: any = {};
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.medicalSelfObservation = {
      id: "",
      summary: "",
      observation: "",
      date: "",
      user_id: "",
    }
  }

  createSelfObservation() {
    this.medicalSelfObservation.id = Math.floor(Math.random() * 100000);
    this.medicalSelfObservation.user_id = JSON.parse(localStorage.getItem('currentUser')).id;
    this.httpService.post('/selfObservation/create', this.medicalSelfObservation).subscribe((response: any) => {
      if (response.success)
        this.router.navigateByUrl('/registers');
    })
  }
  goBack() {
    this.router.navigateByUrl('/registers');
  }
}
