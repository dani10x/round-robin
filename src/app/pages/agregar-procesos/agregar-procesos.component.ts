import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { Proceso } from 'src/app/models/proceso';
import { RoundRobinService } from 'src/app/service/round-robin.service';

@Component({
  selector: 'app-agregar-procesos',
  templateUrl: './agregar-procesos.component.html',
  styleUrls: ['./agregar-procesos.component.css']
})
export class AgregarProcesosComponent implements OnInit {

  procesos!: Proceso[];
  nuevosProcesos!: number[];
  loading = false;

  constructor(private toastrService: NbToastrService,
    private roundRobinService: RoundRobinService,
    private router: Router) { }

  ngOnInit(): void {
    this.procesos = [];
    this.nuevosProcesos = [];
  }

  public nuevoProceso(proceso: Proceso): void {
    this.procesos.push(proceso);
  }

  /**
   * Crea un nuevo proceso cada que se hace click en el boton de crear proceso añadiendo nuevo elemento al array contador
   */
  public crearProceso(): void {
    this.nuevosProcesos.push(0);
  }

  public continuar(): void {
    this.loading = true;
    if (this.procesos.length === 0) {
      this.toastrService.show("Se debe guardar por lo menos un proceso", "Error", { status: "danger", icon: "alert-circle-outline" })
      return;
    }
    this.roundRobinService.setProcesos(this.procesos);
    this.roundRobinService.roundRobin().subscribe({
      complete: () => {
        this.loading = false;
        this.router.navigateByUrl('/diagrama');
      },
    });
  }

}
