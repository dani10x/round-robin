import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbInputModule, NbDialogModule, NbButtonModule, NbListModule, NbToastrModule, NbGlobalPhysicalPosition, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { ProcesoComponent } from './components/proceso/proceso.component';
import { AgregarProcesosComponent } from './pages/agregar-procesos/agregar-procesos.component';
import { EntradasSalidasComponent } from './components/entradas-salidas/entradas-salidas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntradaSalidaElementoComponent } from './components/entrada-salida-elemento/entrada-salida-elemento.component';
import { VariablesComponent } from './pages/variables/variables.component';
import { ProcesoGantComponent } from './components/proceso-gant/proceso-gant.component';
import { DesplegarVariablesComponent } from './pages/desplegar-variables/desplegar-variables.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcesoComponent,
    AgregarProcesosComponent,
    EntradasSalidasComponent,
    EntradaSalidaElementoComponent,
    VariablesComponent,
    ProcesoGantComponent,
    DesplegarVariablesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    AppRoutingModule,
    NbCardModule,
    NbInputModule,
    NbDialogModule.forRoot({ closeOnEsc: false }),
    NbButtonModule,
    NbListModule,
    ReactiveFormsModule,
    FormsModule,
    NbToastrModule.forRoot({ position: NbGlobalPhysicalPosition.TOP_RIGHT }),
    NbSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
