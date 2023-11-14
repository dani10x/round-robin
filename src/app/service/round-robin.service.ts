import { Injectable } from '@angular/core';
import { Proceso } from '../models/proceso';
import { VariablesService } from './variables.service';

@Injectable({
  providedIn: 'root'
})
export class RoundRobinService {

  procesos: Proceso[] = [];
  colaListos: Proceso[] = [];
  calaEyS: Proceso[] = [];
  tiempo: number = 1;
  procesadorListo = true;
  procesoEnProcesador!: Proceso;
  private INTERCAMBIO: number;
  private Q: number;
  private tiempoQ = 0;
  private tiempoI = 0;
  private intercambio = false;

  constructor(variablesService: VariablesService) {
    this.INTERCAMBIO = variablesService.getIntercambio();
    this.Q = variablesService.getTamanioQ();
  }

  private ordenarProcesoAscendente(a: Proceso, b: Proceso): number {
    return a.tiempoLlegada - b.tiempoLlegada
  }

  public setProcesos(procesos: Proceso[]): void {
    this.procesos = procesos;
  }

  /**
   * Ejecucion del algoritmo round robin
   */
  public roundRobin(): void {
    this.procesos.sort(this.ordenarProcesoAscendente);
    console.log(this.procesos);
    while (true) {
      this.nuevoAListo();
      this.asignarProcesador();
      this.restarTiempoProcesador();

      if (this.colaListos.length === 0 && this.procesos.length === 0 && this.procesoEnProcesador.identificador === -1) {
        console.log('finalizacion');
        break;
      }
      if (this.tiempo === 10000) {
        console.log('time out');
        break;
      }
      this.tiempo++;
    }

  }

  /**
   * Pasa los procesos de la cola de nuevos a la cola de listos
   * @returns
   */
  private nuevoAListo(): void {
    const procesosListos = this.procesos.filter(proceso => proceso.tiempoLlegada === this.tiempo);

    if (procesosListos.length === 0) {
      return;
    }

    this.procesos = this.procesos.filter(proceso => proceso.tiempoLlegada !== this.tiempo);
    this.colaListos.push(...procesosListos);
  }

  /**
   * Realiza la simulacion de asignar procesador a un proceso, siempre y cuando el procesador esté disponible.
   * Se saca el proceso que vaya a entrar en el procesador de la cola de listos y se guarda como el proceso en procesador
   */
  private asignarProcesador(): void {
    if (this.procesadorListo) {
      let proceso = this.colaListos.shift();
      if (proceso) {
        this.procesoEnProcesador = proceso;
        console.log('entra:' + this.procesoEnProcesador.identificador + ' tiempo:' + this.tiempo);
        this.procesadorListo = false;
      }
    }
  }

  /**
   * Realiza la resta de necesidad de quantum al proceso que esta activo en la cpu
   */
  private restarNecesidadQ(): void {
    this.procesoEnProcesador.necesidadCPU--;
    if (this.procesoEnProcesador.necesidadCPU !== 0) {
      this.colaListos.push(this.procesoEnProcesador);
      console.log('le queda:' + this.procesoEnProcesador.necesidadCPU + ' tiempo:' + this.tiempo);
    }
    else {
      let copiaProceso = Object.assign({}, this.procesoEnProcesador);
      copiaProceso.identificador = -1;
      this.procesoEnProcesador = copiaProceso;
      console.log(this.procesos);
      console.log(this.colaListos);
      console.log(this.procesoEnProcesador);
      //entradasSalidas
    }
  }

  /**
   * Realiza la cuenta por milisegundos del tiempo que lleva el proceso en el procesador.
   * Una vez finalizado el tiempo, pasa el proceso a intercambio
   *
   */
  private restarTiempoProcesador(): void {
    if (this.intercambio) {
      //Ingresa a la cuenta del tiempo en el intercambio
      this.realizarIntercambio();
      return;
    }
    if (!this.procesadorListo && this.tiempoI === 0) {
      this.tiempoQ++;
    }
    if (this.tiempoQ === this.Q) {
      console.log('procesador:' + this.tiempo);
      this.tiempoQ = 0;
      //Variable que indica el inicio del intercambio
      this.intercambio = true;
    }
  }

  /**
   * Realiza la cuenta del tiempo en milisegundos del intercambio de un proceso
   * Una vez termina, lo envia a restar la necesidad de CPU del proceso activo en el procesador
   */
  private realizarIntercambio(): void {
    if (!this.procesadorListo && this.tiempoQ === 0) {
      this.tiempoI++;
    }
    if (this.tiempoI === this.INTERCAMBIO) {
      console.log('intercambio:' + this.tiempo);
      this.tiempoI = 0;
      //Indicamos que el procesador está listo para ser utilizando con otro proceso
      this.procesadorListo = true;
      this.restarNecesidadQ();
      //Indicamos que el intercambio a finalizado
      this.intercambio = false;
    }
  }

}
