import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entrada-salida-elemento',
  templateUrl: './entrada-salida-elemento.component.html',
  styleUrls: ['./entrada-salida-elemento.component.css']
})
export class EntradaSalidaElementoComponent {

  @Input() EyS!: number;
  @Input() ncpu!: number;

  constructor() { }

}
