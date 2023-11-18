import { Component, Input } from '@angular/core';
import { ProcesoGant } from 'src/app/models/proceso-gant';

@Component({
  selector: 'app-proceso-gant',
  templateUrl: './proceso-gant.component.html',
  styleUrls: ['./proceso-gant.component.css']
})
export class ProcesoGantComponent {

  @Input() proceso!: ProcesoGant;

  constructor() { }

}
