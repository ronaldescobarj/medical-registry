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

  // constructor(private httpService: HttpService,private route: ActivatedRoute, private location: Location) { }
  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.consultation = {doctor: "",description:"",diagnostic:"",hospital:"",commentary:""};
      // this.httpService.get('consultation/get?id='+this.id).subscribe((response: any) => {
      //   if(response.success)
      //     this.consultation = response.response;
      // })
  }
  goBack() {
    this.location.back();
  }
}
