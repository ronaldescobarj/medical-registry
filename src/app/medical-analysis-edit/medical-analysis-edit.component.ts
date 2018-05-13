import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute,Router} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-medical-analysis-edit',
  templateUrl: './medical-analysis-edit.component.html',
  styleUrls: ['./medical-analysis-edit.component.css']
})
export class MedicalAnalysisEditComponent implements OnInit {

  private medicalAnalysis:any;
  private id;

  constructor(private httpService: HttpService, private route: ActivatedRoute,private location: Location,private router: Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
      this.httpService.get('/analysis/get?id='+this.id).subscribe((response: any) => {
        console.log(response);
          this.medicalAnalysis = response.response[0];
      })
  }

  saveChanges(){
    this.httpService.post('/analysis/update', this.medicalAnalysis).subscribe((response: any)=>{
         console.log(response);
    this.router.navigateByUrl('/registers');  
    })
}
  goBack() {
    this.location.back();
  }
}
