import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-medical-consultation-edit',
  templateUrl: './medical-consultation-edit.component.html',
  styleUrls: ['./medical-consultation-edit.component.css']
})
export class MedicalConsultationEditComponent implements OnInit {

  constructor(private httpService: HttpService, private route: ActivatedRoute,private location: Location, private router: Router) { }

  private medicalConsultation: any;
  private id: any;
  private show: boolean = false;
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
      this.httpService.get('/consultation/get?id='+this.id).subscribe((response: any) => {
        if (response.success) {
          this.medicalConsultation = response.response;
          this.show = true;
        }  
      })
  }
  saveChanges(){
      this.httpService.post('/consultation/update', this.medicalConsultation).subscribe((response: any)=>{
        if (response.success)
          this.router.navigateByUrl('/registers');  
      })
  }

  goBack() {
    this.router.navigateByUrl('/registers');    
  }
  
}
