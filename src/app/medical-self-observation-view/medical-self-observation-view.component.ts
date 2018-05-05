import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-self-observation-view',
  templateUrl: './medical-self-observation-view.component.html',
  styleUrls: ['./medical-self-observation-view.component.css']
})
export class MedicalSelfObservationViewComponent implements OnInit {


  private selfObservation:any;

  constructor() { }

  ngOnInit() {
    this.selfObservation = {
      text:'El doctor Dimitri me parece una basura'
    }
  }

}
