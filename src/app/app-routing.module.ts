import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalRegistersViewComponent } from './medical-registers-view/medical-registers-view.component';
import { MedicalConsultationViewComponent } from './medical-consultation-view/medical-consultation-view.component';
import { MedicalAnalysisViewComponent } from './medical-analysis-view/medical-analysis-view.component';
import { MedicalSelfObservationViewComponent } from './medical-self-observation-view/medical-self-observation-view.component';
import { MedicalConsultationCreateComponent } from './medical-consultation-create/medical-consultation-create.component';
import { MedicalConsultationEditComponent } from './medical-consultation-edit/medical-consultation-edit.component';
import { MedicalAnalysisCreateComponent } from './medical-analysis-create/medical-analysis-create.component';
import { MedicalAnalysisEditComponent } from './medical-analysis-edit/medical-analysis-edit.component';
import { MedicalSelfObservationCreateComponent } from './medical-self-observation-create/medical-self-observation-create.component';
import { MedicalSelfObservationEditComponent } from './medical-self-observation-edit/medical-self-observation-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/registers', pathMatch: 'full' },
  { path: 'registers', component: MedicalRegistersViewComponent },
  { path: 'medicalConsultation/:id', component: MedicalConsultationViewComponent },
  { path: 'medicalAnalysis/:id', component: MedicalAnalysisViewComponent },
  { path: 'medicalSelfObservation/:id', component: MedicalSelfObservationViewComponent },
  { path: 'medicalConsultation/crud/create', component: MedicalConsultationCreateComponent },
  { path: 'medicalConsultation/crud/edit/:id', component: MedicalConsultationEditComponent },
  { path: 'medicalAnalysis/crud/create', component: MedicalAnalysisCreateComponent },
  { path: 'medicalAnalysis/crud/edit/:id', component: MedicalAnalysisEditComponent },
  { path: 'medicalSelfObservation/crud/create', component: MedicalSelfObservationCreateComponent },
  { path: 'medicalSelfObservation/crud/edit/:id', component: MedicalSelfObservationEditComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }