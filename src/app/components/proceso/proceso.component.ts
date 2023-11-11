import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { EntradasSalidasComponent } from '../entradas-salidas/entradas-salidas.component';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent implements OnInit {

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }

  public crearEyS(): void {
    this.dialogService.open(EntradasSalidasComponent);
  }

}
