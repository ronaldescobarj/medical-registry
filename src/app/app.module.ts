import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './/app-routing.module';
import { MedicalRegistersViewComponent } from './medical-registers-view/medical-registers-view.component';
import { MedicalConsultationViewComponent } from './medical-consultation-view/medical-consultation-view.component';
import { MedicalAnalysisViewComponent } from './medical-analysis-view/medical-analysis-view.component';
import { MedicalSelfObservationViewComponent } from './medical-self-observation-view/medical-self-observation-view.component';
import { HttpService } from './http.service';
import { MedicalConsultationEditComponent } from './medical-consultation-edit/medical-consultation-edit.component';
import { MedicalConsultationCreateComponent } from './medical-consultation-create/medical-consultation-create.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { BsModalModule } from 'ng2-bs3-modal';
import { FormsModule } from '@angular/forms';
import { MedicalAnalysisCreateComponent } from './medical-analysis-create/medical-analysis-create.component';
import { MedicalAnalysisEditComponent } from './medical-analysis-edit/medical-analysis-edit.component';
import { MedicalSelfObservationCreateComponent } from './medical-self-observation-create/medical-self-observation-create.component';
import { MedicalSelfObservationEditComponent } from './medical-self-observation-edit/medical-self-observation-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    MedicalRegistersViewComponent,
    MedicalConsultationViewComponent,
    MedicalAnalysisViewComponent,
    MedicalSelfObservationViewComponent,
    MedicalConsultationEditComponent,
    MedicalConsultationCreateComponent,
    DeleteModalComponent,
    MedicalAnalysisCreateComponent,
    MedicalAnalysisEditComponent,
    MedicalSelfObservationCreateComponent,
    MedicalSelfObservationEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsModalModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
