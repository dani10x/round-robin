import { EntradaYSalida } from "./entradaYSalida";

export class Proceso {
  identificador: number;
  tiempoLlegada: number;
  necesidadCPU: number;
  entradasSalidas: EntradaYSalida[];

  constructor(identificador: number, tiempoLlegada: number, necesidadCPU: number) {
    this.identificador = identificador;
    this.tiempoLlegada = tiempoLlegada;
    this.necesidadCPU = necesidadCPU;
    this.entradasSalidas = [];
  }

  public numeroEyS(): number {
    return this.entradasSalidas.length;
  }

  public siguienteEyS(): EntradaYSalida | null {
    return this.entradasSalidas.shift() ?? null;
  }
}
