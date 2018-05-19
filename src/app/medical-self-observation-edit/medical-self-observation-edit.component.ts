import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medical-self-observation-edit',
  templateUrl: './medical-self-observation-edit.component.html',
  styleUrls: ['./medical-self-observation-edit.component.css']
})
export class MedicalSelfObservationEditComponent implements OnInit {

  private medicalSelfObservation: any;
  private id: any;
  private show: boolean = false;

  private dateError: boolean;
  private observationError: boolean;
  private firstTime: boolean;
  private observationValidator: boolean;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.dateError = false;
    this.observationError = false;
    this.firstTime = true;
    this.observationValidator = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.httpService.get('/selfObservation/get?id=' + this.id).subscribe((response: any) => {
      if (response.success) {
        this.medicalSelfObservation = response.response;
        this.show = true;
      }
    })
  }
  saveChanges() {
    if (this.validate()) {
      this.httpService.post('/selfObservation/update', this.medicalSelfObservation).subscribe((response: any) => {
        if (response.success)
          this.router.navigateByUrl('/registers');
      })
    }
  }

  goBack() {
    this.router.navigateByUrl('/registers');
  }

  validate() {
    let res = true;
    this.firstTime = false;
    if (this.medicalSelfObservation.observation == "") {
      this.observationError = true;
      this.observationValidator = false;
      res = false;
    } else {
      this.observationError = false;
      this.observationValidator = true;
    }

    if (this.medicalSelfObservation.date == "") {
      this.dateError = true;
      res = false;
    } else {
      this.dateError = false;
    }
    return res;
  }

  borderColor() {
    if (!this.firstTime && (!this.observationValidator || this.observationError))
      return 'tomato'
    return "";
  }
}
