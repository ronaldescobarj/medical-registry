import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-medical-analysis-view',
  templateUrl: './medical-analysis-view.component.html',
  styleUrls: ['./medical-analysis-view.component.css']
})
export class MedicalAnalysisViewComponent implements OnInit {

  private analysis : any;
  private id:String;
  constructor(private httpService: HttpService, private route: ActivatedRoute,private location: Location) { }

  ngOnInit() {
  
      this.id = this.route.snapshot.paramMap.get('id');
      this.httpService.get('/analysis/get?id='+this.id).subscribe((response: any) => {
          this.analysis = response.response[0];
      })
  }
  goBack() {
    this.location.back();
  }

}
