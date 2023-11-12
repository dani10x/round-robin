import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  private contadorProcesos = 0;

  constructor() { }

  public nuevoIdentificadorProceso(): number {
    this.contadorProcesos ++;
    return this.contadorProcesos - 1;
  }

  public reiniciarContador(): void {
    this.contadorProcesos = 0;
  }
}
