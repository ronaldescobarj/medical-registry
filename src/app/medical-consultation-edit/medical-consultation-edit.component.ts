import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../http.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-medical-consultation-edit',
  templateUrl: './medical-consultation-edit.component.html',
  styleUrls: ['./medical-consultation-edit.component.css']
})
export class MedicalConsultationEditComponent implements OnInit {

  constructor(private httpService: HttpService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  private subscription: Subscription;
  private medicalConsultation: any;
  private id: any;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = this.httpService.get('/consultation/get?id=' + this.id).subscribe((response: any) => {
      console.log(response);
      this.medicalConsultation = response.response[0];
    })
  }
  saveChanges() {
    this.httpService.post('/consultation/update', this.medicalConsultation).subscribe((response: any) => {
      console.log(response);
      this.router.navigateByUrl('/registers');

    })
  }

  goBack() {
    this.router.navigateByUrl('/registers');
  }

}
