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
  private testImage: any;
  private images: any;

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
    var imagesObj = {images: []};
    this.httpService.post('/analysis/create', this.medicalAnalysis).subscribe((response: any)=>{
      if (response.success) {
        for (let i = 0; i < this.images.length; i++) {
          let imageObj = {
            id: Math.floor(Math.random() * 100000),
            base_64_image: this.images[i].value,
            file_name: this.images[i].filename,
            file_type: this.images[i].filetype,
            analysis_id: this.medicalAnalysis.id
          };
          imagesObj.images.push(imageObj);
        }
        this.httpService.post('/image/add', imagesObj).subscribe((res: any) => {
          if (res.success) {
            this.router.navigateByUrl('/registers');            
          }
        })
      }
    })
  }

  goBack() {
    this.router.navigateByUrl('/registers');    
  }

  onFileChange(event) {
    let readers = [];
    this.images = [];
    if(event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        readers[i] = new FileReader();
        let file = event.target.files[i];
        readers[i].readAsDataURL(file);
        readers[i].onload = () => {
          this.images.push({
            filename: file.name,
            filetype: file.type,
            value: readers[i].result.split(',')[1]
          });
        };
      }
    }
  }
}
