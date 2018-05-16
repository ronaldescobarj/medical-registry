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

  private diagnosticError: boolean;
  private doctorError: boolean;
  private dateError: boolean;
  private diagnosticValidator: boolean;
  private doctorValidator: boolean;
  private firstTime: boolean;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.diagnosticError = false;
    this.doctorError = false;
    this.diagnosticValidator = true;
    this.doctorValidator = true;
    this.firstTime = true;
    this.dateError = false;

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
    if (this.validate()) {
      this.medicalConsultation.id = Math.floor(Math.random() * 100000);
      this.medicalConsultation.user_id = 10;
      this.httpService.post('/consultation/create', this.medicalConsultation).subscribe((response: any) => {
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
    if (this.medicalConsultation.diagnostic == "") {
      this.diagnosticError = true;
      this.diagnosticValidator = false;
      res = false;
    } else {
      this.diagnosticError = false;
      this.diagnosticValidator = true;
    }

    if (this.medicalConsultation.doctor == "") {
      this.doctorError = true;
      this.doctorValidator = false;
      res = false;
    } else {
      this.doctorError = false;
      this.doctorValidator = true;
    }

    if (this.medicalConsultation.date == "") {
      this.dateError = true;
      res = false;
    } else {
      this.dateError = false;
    }
    return res;
  }

  borderColor(isDoctor: boolean) {
    if (isDoctor) {
      if (!this.firstTime && (!this.doctorValidator || this.doctorError))
        return 'tomato'
    }
    else {
      if (!this.firstTime && (!this.diagnosticValidator || this.diagnosticError))
        return 'tomato'
    }
    return "";
  }

}
