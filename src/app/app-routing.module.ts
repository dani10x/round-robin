import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AgregarProcesosComponent } from './pages/agregar-procesos/agregar-procesos.component';

const routes: Routes = [
  { path: 'procesos', component: AgregarProcesosComponent },
  { path: '', redirectTo: '/procesos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
