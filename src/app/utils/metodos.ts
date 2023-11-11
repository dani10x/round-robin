export class MetodosUtil {

  /**
   * Convierte quantum a su equivalente en ms
   * @param quantum Q a convertir
   * @param ms Equivalente en Milisegundos de un Q
   * @returns Milisegundos
   */
  public static quantumToMs(quantum: number, ms: number): number {
    return quantum * ms;
  }
}
