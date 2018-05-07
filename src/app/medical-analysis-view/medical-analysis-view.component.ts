import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medical-analysis-view',
  templateUrl: './medical-analysis-view.component.html',
  styleUrls: ['./medical-analysis-view.component.css']
})
export class MedicalAnalysisViewComponent implements OnInit {

  private analysis : any;

  constructor(private location: Location) { }

  ngOnInit() {
      this.analysis = {
        id:1,
        type:'Blood Analysis',
        text:'Clean',
        date:'2018-03-24',
        hospital:'Viedma',
        commentary:'clean blood'};
  }

  goBack() {
    this.location.back();
  }

}
