import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  //Propiedad global que define que un Q = 1ms
  private QUANTUM: number = 1;

  constructor() { }

  /**
   * Método para asignar el tamaño de los Q
   * @param ms Tamaño del Q en milisegundos
   */
  public setTamanioQ(ms: number): void {
    this.QUANTUM = ms;
  }

  /**
   * Metodo para obtener el tamaño de los Q
   * @returns Q en milisegundos
   */
  public getTamanioQ(): number {
    return this.QUANTUM;
  }
}
