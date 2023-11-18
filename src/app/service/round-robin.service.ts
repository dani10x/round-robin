import { Injectable } from '@angular/core';
import { Proceso } from '../models/proceso';
import { VariablesService } from './variables.service';
import { MetodosUtil } from '../utils/metodos';
import { ProcesoGant } from '../models/proceso-gant';
import { IntercambioGant } from '../models/intercambio-gant';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoundRobinService {

  /**Cola de procesos nuevos */
  private procesos: Proceso[] = [];
  /**Cola de procesos listos */
  private colaListos: Proceso[] = [];
  /**Contador del tiempo en Ms de ejecución */
  private tiempo: number = 1;
  /**Bandera que indica que ell procesador esta listo para ser utilizado */
  private procesadorListo = true;
  /**Proceso que se encuentra activo en el procesador (identificador = -1, cuando no hay procesos en el procesador) */
  private procesoEnProcesador!: Proceso;
  /**Valor en Ms del intercambio, (se toma el valor desde el servicio de variables) */
  private INTERCAMBIO: number;
  /**Valor en Ms del quantum, (se toma el valor desde el servicio de variables) */
  private Q: number;
  /**Tiempo en Ms que se ha cumplido de un proceso en el procesador (0 indica que se ha completado) */
  private tiempoQ = 0;
  /**Tiempo en Ms que se ha cumplido de un proceso que esté realizando intercambio  (0 indica que se ha completado) */
  private tiempoI = 0;
  /**Bandera que indica que se está realizando intercambio */
  private intercambio = false;

  private diagrama: ProcesoGant[] = [];

  constructor(variablesService: VariablesService) {
    this.INTERCAMBIO = variablesService.getIntercambio();
    this.Q = variablesService.getTamanioQ();
  }

  /**
   * Criterio para ordenar los procesos de forma ascendente de acuerdo con su tiempo de llegada
   * @param a Proceso 1 a comparar
   * @param b Proceso 2 a comparar
   * @returns criterio de orden: negativo (si b es mayor que a), positivo (si a es mayor que b), cero (si a y b son iguales)
   */
  private ordenarProcesoAscendente(a: Proceso, b: Proceso): number {
    return a.tiempoLlegada - b.tiempoLlegada
  }

  /**
   * Método de entrada necesario para la ejecución del algoritmo Round-Robin.
   * Recibe los procesos sobre los cuales se aplicará la simulación
   * @param procesos Array con los procesos
   */
  public setProcesos(procesos: Proceso[]): void {
    this.procesos = procesos;
  }

  /**
   * Ejecucion del algoritmo round robin
   */
  public roundRobin(): Observable<void> {
    return new Observable<void>((subscriber: Subscriber<void>) => {
      this.procesos.sort(this.ordenarProcesoAscendente);
      console.log(this.procesos);

      const intervalId = setInterval(() => {
        this.nuevoAListo();
        this.asignarProcesador();
        this.restarTiempoProcesador();

        if (this.colaListos.length === 0 && this.procesos.length === 0 && this.procesoEnProcesador.identificador === -1) {
          console.log('finalizacion');
          this.eliminarUltimoIntercambio()
          clearInterval(intervalId);
          subscriber.complete();
        }

        if (this.tiempo === 20000) {
          console.log('time out');
          clearInterval(intervalId);
          subscriber.complete();
        }

        this.tiempo++;
      }, 0);
    });
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
   * Realiza la resta de necesidad de quantum al proceso que esta activo en la cpu,
   * si el proceso aun necesita mas tiempo de procesador, lo retorna a la cola de listos,
   * de lo contrario lo manda a realizar entradas y salidas
   */
  private restarNecesidadQ(): void {
    this.procesoEnProcesador.necesidadCPU--;
    this.agregarProcesoDiagrama(this.tiempo - this.INTERCAMBIO, this.procesoEnProcesador.identificador, this.tiempo);
    if (this.procesoEnProcesador.necesidadCPU !== 0) {
      this.colaListos.push(this.procesoEnProcesador);
      console.log('le queda:' + this.procesoEnProcesador.necesidadCPU + ' tiempo:' + this.tiempo);
    }
    else {
      let copiaProceso = Object.assign({}, this.procesoEnProcesador);
      copiaProceso.identificador = -1;
      this.realizarEyS(this.procesoEnProcesador);
      this.procesoEnProcesador = copiaProceso;
      console.log(this.procesos);
      console.log(this.colaListos);
      console.log(this.procesoEnProcesador);
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

  /**
   * Método que realiza las entradas y salidas de cada proceso,
   * se saca el objeto eys del array de entradas y salidas del proceso,
   * se calcula el tiempo en el que el proceso volveria a entrar de acuerdo con su tiempo de eys
   * y este vuelve a entrar a la cola de procesos con el nuevo tiempo de entrada y necesidad de cpu.
   *
   * Si el proceso no tiene entradas y salidas, finaliza la ejecución de dicho proceso
   * @param proceso proceso sobre el cual se realizará la opración de entrada y salida
   */
  private realizarEyS(proceso: Proceso): void {
    let eys = proceso.entradasSalidas.shift();
    if(eys) {
      proceso.tiempoLlegada = MetodosUtil.quantumToMs(eys.tiempoEYS, this.Q) + this.tiempo;
      proceso.necesidadCPU = eys.necesidadCPU;
      this.procesos.push(proceso);
      this.procesos.sort(this.ordenarProcesoAscendente);
      console.log('realiza e/s: ' + proceso.identificador +  ', llegada en: ' + proceso.tiempoLlegada)
    }
  }

  public getDiagrama(): ProcesoGant[] {
    return this.diagrama;
  }

  private agregarProcesoDiagrama(salida: number, proceso: number, salidaIntercambio?: number): void {
    const procesoGant = new ProcesoGant();
    procesoGant.salida = salida;
    procesoGant.proceso = 'P' + proceso;
    procesoGant.quantum = 1;
    if(this.diagrama.length === 0) {
      procesoGant.entrada = this.tiempo - this.Q - this.INTERCAMBIO;
      procesoGant.inicio = true;
    }
    else {
      procesoGant.inicio = false;
    }
    if(salidaIntercambio) {
      const intercambioGant = new IntercambioGant();
      intercambioGant.salida = salidaIntercambio;
      intercambioGant.quantum = (this.INTERCAMBIO / this.Q).toFixed(2);
      procesoGant.intercambio = intercambioGant;
    }
    this.diagrama.push(procesoGant);
  }

  private eliminarUltimoIntercambio(): void {
    const procesoGant = this.diagrama.pop();
    if (procesoGant) {
      procesoGant.intercambio = undefined;
      this.diagrama.push(procesoGant);
    }
  }
}
