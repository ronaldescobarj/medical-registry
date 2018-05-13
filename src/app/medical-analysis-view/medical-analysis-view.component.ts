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
  private show: boolean = false;

  constructor(private httpService: HttpService, private route: ActivatedRoute,private location: Location) { }

  ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.httpService.get('/analysis/get?id='+this.id).subscribe((response: any) => {
        if (response.success) {
          this.analysis = response.response;
          this.show = true;
        }  
      })
  }
  goBack() {
    this.location.back();
  }

}
