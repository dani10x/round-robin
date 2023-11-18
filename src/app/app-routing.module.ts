import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AgregarProcesosComponent } from './pages/agregar-procesos/agregar-procesos.component';
import { VariablesComponent } from './pages/variables/variables.component';
import { DesplegarVariablesComponent } from './pages/desplegar-variables/desplegar-variables.component';

const routes: Routes = [
  { path: 'procesos', component: AgregarProcesosComponent },
  { path: 'configuracion', component: VariablesComponent },
  { path: 'diagrama', component: DesplegarVariablesComponent },
  { path: '', redirectTo: '/configuracion', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
