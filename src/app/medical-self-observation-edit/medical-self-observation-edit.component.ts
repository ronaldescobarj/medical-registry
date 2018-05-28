import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medical-self-observation-edit',
  templateUrl: './medical-self-observation-edit.component.html',
  styleUrls: ['./medical-self-observation-edit.component.css']
})
export class MedicalSelfObservationEditComponent implements OnInit {

  private medicalSelfObservation: any;
  private id: any;
  private show: boolean = false;
  private error: string;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.httpService.get('/selfObservation/get?id=' + this.id).subscribe((response: any) => {
      if (response.success) {
        if (response.response.id) {
          this.medicalSelfObservation = response.response;
        }
        else {
          this.error = "La observacion propia solicitada no existe, o pertenece a otro usuario";
        }
        this.show = true;
      }
    })
  }
  saveChanges() {
    this.httpService.post('/selfObservation/update', this.medicalSelfObservation).subscribe((response: any) => {
      if (response.success)
        this.router.navigateByUrl('/registers');
    })
  }
  goBack() {
    this.router.navigateByUrl('/registers');
  }
}
