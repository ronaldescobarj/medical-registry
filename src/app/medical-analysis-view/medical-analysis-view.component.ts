import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medical-analysis-view',
  templateUrl: './medical-analysis-view.component.html',
  styleUrls: ['./medical-analysis-view.component.css']
})
export class MedicalAnalysisViewComponent implements OnInit {

  private analysis : any;
  private id:String;
  
  constructor(private httpService: HttpService,private route: ActivatedRoute,private location: Location) { }

  ngOnInit() {
  
      this.id = this.route.snapshot.paramMap.get('id');
      this.analysis = {type: "",text:"",date:"",hospital:"",commentary:""};
      this.httpService.get('analysis/get?id='+this.id).subscribe((response: any) => {
          this.analysis = response.response;
      })
  }
  goBack() {
    this.location.back();
  }

}
