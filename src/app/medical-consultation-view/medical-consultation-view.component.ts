import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../http.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-medical-consultation-view',
  templateUrl: './medical-consultation-view.component.html',
  styleUrls: ['./medical-consultation-view.component.css']
})
export class MedicalConsultationViewComponent implements OnInit {

  private consultation: any;
  private id: string;
  private subscription: Subscription;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = this.httpService.get('/consultation/get?id=' + this.id).subscribe((response: any) => {
      this.consultation = response.response[0];
    })
  }

  goBack() {
    this.location.back();
  }
}
