import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-medical-self-observation-edit',
  templateUrl: './medical-self-observation-edit.component.html',
  styleUrls: ['./medical-self-observation-edit.component.css']
})
export class MedicalSelfObservationEditComponent implements OnInit {

  private medicalSelfObservation: any;
  private id: any;
  constructor(private httpService: HttpService, private route: ActivatedRoute,private location: Location, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
      this.httpService.get('/selfObservation/get?id='+this.id).subscribe((response: any) => {
        console.log(response);
          this.medicalSelfObservation = response.response[0];
      })
  }
  saveChanges(){
      this.httpService.post('/selfObservation/update', this.medicalSelfObservation).subscribe((response: any)=>{
           console.log(response);
    this.router.navigateByUrl('/registers');  
      })
  }
  goBack() {
    this.router.navigateByUrl('/registers');    
  }
}
