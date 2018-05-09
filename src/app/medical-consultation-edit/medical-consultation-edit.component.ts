import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medical-consultation-edit',
  templateUrl: './medical-consultation-edit.component.html',
  styleUrls: ['./medical-consultation-edit.component.css']
})
export class MedicalConsultationEditComponent implements OnInit {

  constructor(private httpService: HttpService,private route: ActivatedRoute,private location: Location) { }

  private medicalConsultation: any;
  private id: any;
  
  @Input() id: any;

  ngOnInit() {
    // this.medicalConsultation = //request from the database
    this.id = this.route.snapshot.paramMap.get('id');
      this.medicalConsultation = {doctor: "",description:"",diagnostic:"",hospital:"",commentary:""};
      this.httpService.get('consultation/get?id='+this.id).subscribe((response: any) => {
          this.medicalConsultation = response.response;
      })
  }
  saveChanges(){
      this.httpService.get('/consultation/update?id='+this.id).subscribe((Response: any)=>{
           
      })
  }

  
}
