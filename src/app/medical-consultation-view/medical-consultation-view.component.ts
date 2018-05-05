import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medical-consultation-view',
  templateUrl: './medical-consultation-view.component.html',
  styleUrls: ['./medical-consultation-view.component.css']
})
export class MedicalConsultationViewComponent implements OnInit {

  private consultation:any;
  private id: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
      this.consultation = {doctor:'Dimitri moskov',prescripcion:'Debe tomar 5 pastillas al dia',diagnostico:'Tiene Paralisis cerebral',hospital:'Vietma',comentary:'Estuvo malo'}
  }

}
