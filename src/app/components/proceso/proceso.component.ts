import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { EntradasSalidasComponent } from '../entradas-salidas/entradas-salidas.component';
import { EntradaYSalida } from 'src/app/models/entradaYSalida';
import { Proceso } from 'src/app/models/proceso';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcesoService } from 'src/app/service/proceso.service';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent implements OnInit {

  proceso!: Proceso;
  mostrarAcciones = true;
  procesoForm!: FormGroup;

  @Output() nuevoProceso = new EventEmitter<Proceso>();

  constructor(private dialogService: NbDialogService, private fb: FormBuilder, private procesoService: ProcesoService) { }

  ngOnInit(): void {
    this.proceso = new Proceso();
    this.proceso.identificador = this.procesoService.nuevoIdentificadorProceso();
    this.initForm();
  }

  public crearEyS(): void {
    this.dialogService.open(EntradasSalidasComponent).onClose.subscribe({
      next: (res) => {
        const eys = res as EntradaYSalida | null;
        if (eys) {
          this.proceso.entradasSalidas.push(eys);
        }
      },
      error: (e) => console.error(e),
    });
  }

  public guardar(): void {
    if (this.procesoForm.invalid) {
      this.procesoForm.markAllAsTouched();
      return;
    }
    this.asignarDatosProceso();
    this.disableForm();
    this.mostrarAcciones = false;
    this.nuevoProceso.emit(this.proceso);
  }

  private initForm(): void {
    this.procesoForm = this.fb.group({
      llegada: ['', [Validators.required, Validators.min(0), Validators.max(9000)]],
      cpu: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  private disableForm(): void {
    this.procesoForm.get('llegada')?.disable();
    this.procesoForm.get('cpu')?.disable();
  }

  private asignarDatosProceso(): void {
    this.proceso.tiempoLlegada = this.procesoForm.get('llegada')?.value;
    this.proceso.necesidadCPU = this.procesoForm.get('cpu')?.value;
  }
}
