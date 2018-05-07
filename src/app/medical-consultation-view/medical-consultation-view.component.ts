import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medical-consultation-view',
  templateUrl: './medical-consultation-view.component.html',
  styleUrls: ['./medical-consultation-view.component.css']
})
export class MedicalConsultationViewComponent implements OnInit {

  private consultation:any;
  private id: string;

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
      this.consultation = {
        doctor:'Juan Perez',
        prescription:'take pills three times a day',
        diagnostic:'sick',
        hospital:'Viedma',
        commentary:'the pills are too expensive'
      }
  }

  goBack() {
    this.location.back();
  }

}
