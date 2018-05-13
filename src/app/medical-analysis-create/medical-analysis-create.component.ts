import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-analysis-create',
  templateUrl: './medical-analysis-create.component.html',
  styleUrls: ['./medical-analysis-create.component.css']
})
export class MedicalAnalysisCreateComponent implements OnInit {

  private medicalAnalysis:any = {};
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.medicalAnalysis = {
      id:"",
      summary:"",
      type:"",
      description:"",
      hospital:"",
      commentary:"",
      date:"",  
      user_id:"",
    }
  }
  createAnalysis() {
    this.medicalAnalysis.id = Math.floor(Math.random() * 100000);
    this.medicalAnalysis.user_id = 10;
    this.httpService.post('/analysis/create', this.medicalAnalysis).subscribe((response: any)=>{
      if (response.success)
        this.router.navigateByUrl('/registers');})
  }
  goBack() {
    this.router.navigateByUrl('/registers');    
  }
}
