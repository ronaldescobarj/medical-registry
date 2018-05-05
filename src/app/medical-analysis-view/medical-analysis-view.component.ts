import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-analysis-view',
  templateUrl: './medical-analysis-view.component.html',
  styleUrls: ['./medical-analysis-view.component.css']
})
export class MedicalAnalysisViewComponent implements OnInit {

  private analysis : any;

  constructor() { }

  ngOnInit() {
      this.analysis = {id:1,type:'Blood Analysis',text:'Positivo',date:'2018-03-24',hospital:'Vietma',comentary:'Estaba bien'};
  }

}
