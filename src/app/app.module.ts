import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { MedicalRegistersViewComponent } from './medical-registers-view/medical-registers-view.component';
import { MedicalConsultationViewComponent } from './medical-consultation-view/medical-consultation-view.component';
import { MedicalAnalysisViewComponent } from './medical-analysis-view/medical-analysis-view.component';
import { MedicalSelfObservationViewComponent } from './medical-self-observation-view/medical-self-observation-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicalRegistersViewComponent,
    MedicalConsultationViewComponent,
    MedicalAnalysisViewComponent,
    MedicalSelfObservationViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
