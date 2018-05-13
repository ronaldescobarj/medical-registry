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
  private testImage: File;
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
      if (response.success) {
        let imageObj = {
          id: Math.floor(Math.random() * 100000),
          image: this.testImage,
          analysis_id: this.medicalAnalysis.id
        }
        this.httpService.post('image/add', imageObj).subscribe((res: any) => {
          if (res.success) {
            this.router.navigateByUrl('/registers');            
            console.log(res);
          }
        })
      }
    })
  }
  goBack() {
    this.router.navigateByUrl('/registers');    
  }

  fileChange(event: any, files: any) {
    console.log("event", event);
    console.log("files", files);
    console.log("test image", this.testImage);
    console.log("files 0", files[0]);
    this.testImage = files[0];
    let fr = new FileReader()
    fr.onload = function(e) 
  }

  convertToBase64
  
}
