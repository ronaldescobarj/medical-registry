import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medical-self-observation-view',
  templateUrl: './medical-self-observation-view.component.html',
  styleUrls: ['./medical-self-observation-view.component.css']
})
export class MedicalSelfObservationViewComponent implements OnInit {


  private selfObservation:any;

  constructor(private location: Location) { }

  ngOnInit() {
    this.selfObservation = {
      text:"after two weeks of medication i don't feel any better"
    }
  }

  goBack() {
    this.location.back();
  }
}
