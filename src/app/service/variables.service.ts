import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  /**
   * Propiedad global que define que un Q = 100ms
   */
  private QUANTUM: number = 100;
  /**
   * Tiempo de intercambio en Ms
   */
  private INTERCAMBIO: number = 10;

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

  /**
   * Método para asignar el tamaño del intercambio
   * @param ms Tamaño del intercambio en milisegundos
   */
  public setIntercambio(ms: number): void {
    this.INTERCAMBIO = ms;
  }

  /**
   * Método para obtener el valor del intercambio en ms
   * @returns Intercambio en milisegundos
   */
  public getIntercambio(): number {
    return this.INTERCAMBIO;
  }
}
