import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-medical-consultation-edit',
  templateUrl: './medical-consultation-edit.component.html',
  styleUrls: ['./medical-consultation-edit.component.css']
})
export class MedicalConsultationEditComponent implements OnInit {

  constructor() { }

  @Input() medicalConsultation: any;
  ngOnInit() {
  }

}
