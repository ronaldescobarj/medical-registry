import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';

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
  private imagesError: boolean;
  private diagnosticValidator: boolean;
  private doctorValidator: boolean;
  private firstTime: boolean;
  private images: any = [];

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.diagnosticError = false;
    this.doctorError = false;
    this.diagnosticValidator = true;
    this.doctorValidator = true;
    this.firstTime = true;
    this.dateError = false;
    this.imagesError = false;

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
      this.medicalConsultation.user_id = JSON.parse(localStorage.getItem('currentUser')).id;
      let imagesObj = { images: [] };
      this.medicalConsultation.date = this.medicalConsultation.date.date.year + '-' +
        this.medicalConsultation.date.date.month + '-' + this.medicalConsultation.date.date.day;
      this.httpService.post('/consultation/create', this.medicalConsultation)
        .subscribe((response: any) => {
          console.log(response);
          if (response.success) {
            this.images.forEach((image: any) => {
              let imageObj = {
                id: Math.floor(Math.random() * 100000),
                base_64_image: image.value,
                file_name: image.filename,
                file_type: image.filetype,
                consultation_id: this.medicalConsultation.id
              };
              imagesObj.images.push(imageObj);
            });
            if (this.images.length) {
              this.httpService.post('/consultationImage/add', imagesObj).subscribe((res: any) => {
                if (res.success) {
                  this.router.navigateByUrl('/registers');
                }
              })
            }
            else
              this.router.navigateByUrl('/registers');
          }
        })
    }
  }

  goBack() {
    this.router.navigateByUrl('/registers');
  }

  onFileChange(event) {
    let readers = [];
    this.images = [];
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        readers[i] = new FileReader();
        let file = event.target.files[i];
        readers[i].readAsDataURL(file);
        readers[i].onload = () => {
          this.images.push({
            filename: file.name,
            filetype: file.type,
            value: readers[i].result.split(',')[1]
          });
        };
      }
    }
  }

  validate() {
    let res = true;
    this.firstTime = false;
    this.images.forEach(image => {
      if (image.filetype != "image/jpeg" && image.filetype != "image/png" && image.filetype != "image/jpg") {
        res = false;
        this.imagesError = true;
      }
    });
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

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    openSelectorOnInputClick: true,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    todayBtnTxt: "Hoy",
    monthLabels: {
      1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio',
      7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
    },
    selectorHeight: "232px",
    selectorWidth: "350px"
  };

  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };


}
