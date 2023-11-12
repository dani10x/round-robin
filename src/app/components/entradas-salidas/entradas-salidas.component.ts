import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { EntradaYSalida } from 'src/app/models/entradaYSalida';

@Component({
  selector: 'app-entradas-salidas',
  templateUrl: './entradas-salidas.component.html',
  styleUrls: ['./entradas-salidas.component.css']
})
export class EntradasSalidasComponent {

  entradaSalidaForm: FormGroup;

  constructor(private fb: FormBuilder, protected ref: NbDialogRef<null>) {
    this.entradaSalidaForm = this.fb.group({
      eys: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      cpu: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  public cerrar(): void {
    if (this.entradaSalidaForm.invalid) {
      this.entradaSalidaForm.markAllAsTouched();
      return;
    }
    const tiempoEYS = this.entradaSalidaForm.get('eys')?.value;
    const cpu = this.entradaSalidaForm.get('cpu')?.value;
    const eys = new EntradaYSalida(tiempoEYS, cpu);
    this.ref.close(eys);
  }

  public cancelar(): void {
    this.ref.close(null);
  }

}
