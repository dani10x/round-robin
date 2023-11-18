import { IntercambioGant } from "./intercambio-gant";

export class ProcesoGant {
  proceso!: string;
  entrada!: number;
  salida!: number;
  quantum!: number;
  inicio!: boolean;
  intercambio?: IntercambioGant;
}
