import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medical-self-observation-view',
  templateUrl: './medical-self-observation-view.component.html',
  styleUrls: ['./medical-self-observation-view.component.css']
})
export class MedicalSelfObservationViewComponent implements OnInit {


  private selfObservation:any;
  private id:String;
  constructor(private httpService: HttpService,private route: ActivatedRoute,private location: Location) { }
  ngOnInit() {
    
      this.id = this.route.snapshot.paramMap.get('id');
      this.selfObservation = {text: ""};
      this.httpService.get('selfObservation/get?id='+this.id).subscribe((response: any) => {
          this.selfObservation = response.response;
      })
    }
  goBack() {
    this.location.back();
  }
}
