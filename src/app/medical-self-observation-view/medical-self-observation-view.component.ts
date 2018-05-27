import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-medical-self-observation-view',
  templateUrl: './medical-self-observation-view.component.html',
  styleUrls: ['./medical-self-observation-view.component.css']
})
export class MedicalSelfObservationViewComponent implements OnInit {


  private selfObservation: any;
  private id: String;
  private show: boolean = false;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.selfObservation = { text: "" };
    this.httpService.get('/selfObservation/get?id=' + this.id).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.selfObservation = response.response;
        this.show = true;
      }
    })
  }
  goBack() {
    this.router.navigateByUrl('/registers');
  }
}
