import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbInputModule, NbDialogModule, NbButtonModule, NbListModule, NbToastrModule, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { ProcesoComponent } from './components/proceso/proceso.component';
import { AgregarProcesosComponent } from './pages/agregar-procesos/agregar-procesos.component';
import { EntradasSalidasComponent } from './components/entradas-salidas/entradas-salidas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntradaSalidaElementoComponent } from './components/entrada-salida-elemento/entrada-salida-elemento.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcesoComponent,
    AgregarProcesosComponent,
    EntradasSalidasComponent,
    EntradaSalidaElementoComponent
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
    NbToastrModule.forRoot({ position: NbGlobalPhysicalPosition.TOP_RIGHT })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
