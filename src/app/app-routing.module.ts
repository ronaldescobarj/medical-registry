import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalRegistersViewComponent } from './medical-registers-view/medical-registers-view.component';
import { MedicalConsultationViewComponent } from './medical-consultation-view/medical-consultation-view.component';
import { MedicalAnalysisViewComponent } from './medical-analysis-view/medical-analysis-view.component';
import { MedicalSelfObservationViewComponent } from './medical-self-observation-view/medical-self-observation-view.component';
import { MedicalConsultationCreateComponent } from './medical-consultation-create/medical-consultation-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/registries', pathMatch: 'full' },
  { path: 'registries', component: MedicalRegistersViewComponent },
  { path: 'medicalConsultation/:id', component: MedicalConsultationViewComponent },
  { path: 'medicalAnalysis/:id', component: MedicalAnalysisViewComponent},
  { path: 'medicalSelfObservation/:id',component:MedicalSelfObservationViewComponent},
  { path: 'medicalConsultation/crud/create',component:MedicalConsultationCreateComponent}  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],  
  exports: [ RouterModule ]
})
export class AppRoutingModule {}