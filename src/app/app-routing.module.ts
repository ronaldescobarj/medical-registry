import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalRegistersViewComponent } from './medical-registers-view/medical-registers-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/registries', pathMatch: 'full' },
  { path: 'registries', component: MedicalRegistersViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],  
  exports: [ RouterModule ]
})
export class AppRoutingModule {}