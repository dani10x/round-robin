import { EntradaYSalida } from "./entrada-y-salida";

export class Proceso {
  identificador!: number;
  tiempoLlegada!: number;
  necesidadCPU!: number;
  entradasSalidas!: EntradaYSalida[];

  constructor() {
    this.entradasSalidas = [];
  }

  public numeroEyS(): number {
    return this.entradasSalidas.length;
  }

  public siguienteEyS(): EntradaYSalida | null {
    return this.entradasSalidas.shift() ?? null;
  }
}
