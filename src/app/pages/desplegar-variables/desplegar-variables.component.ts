import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcesoGant } from 'src/app/models/proceso-gant';
import { RoundRobinService } from 'src/app/service/round-robin.service';

@Component({
  selector: 'app-desplegar-variables',
  templateUrl: './desplegar-variables.component.html',
  styleUrls: ['./desplegar-variables.component.css']
})
export class DesplegarVariablesComponent implements OnInit {

  procesos!: ProcesoGant[];

  constructor(private roundRobinService: RoundRobinService, private router: Router) { }

  ngOnInit(): void {
    this.procesos = this.roundRobinService.getDiagrama();
  }

  public reiniciar(): void {
    this.router.navigateByUrl('/');
  }
}
