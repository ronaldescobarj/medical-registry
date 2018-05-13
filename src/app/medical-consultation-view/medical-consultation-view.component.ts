import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-medical-consultation-view',
  templateUrl: './medical-consultation-view.component.html',
  styleUrls: ['./medical-consultation-view.component.css']
})
export class MedicalConsultationViewComponent implements OnInit {

  private consultation:any;
  private id: string;
  private show: boolean = false;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.httpService.get('/consultation/get?id='+this.id).subscribe((response: any) => {
        if (response.success) {
          this.consultation = response.response;
          this.show = true;
        }
      })
  }
  goBack() {
    this.location.back();
  }
}
