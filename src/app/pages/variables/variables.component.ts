import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoundRobinService } from 'src/app/service/round-robin.service';
import { VariablesService } from 'src/app/service/variables.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {

  variablesForm!: FormGroup;

  constructor(private variablesService: VariablesService,
    private fb: FormBuilder,
    private router: Router,
    private roundRobinService: RoundRobinService) { }

  ngOnInit(): void {
    this.initForm();
    if (this.roundRobinService.getDiagrama().length !== 0) {
      this.reiniciar();
    }
  }

  public continuar(): void {
    if (this.variablesForm.invalid) {
      this.variablesForm.markAllAsTouched();
    }
    this.variablesService.setTamanioQ(this.variablesForm.get('quantum')?.value);
    this.variablesService.setIntercambio(this.variablesForm.get('intercambio')?.value);
    this.router.navigateByUrl('/procesos')
  }

  private initForm(): void {
    this.variablesForm = this.fb.group({
      quantum: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      intercambio: ['', [Validators.required, Validators.min(1), Validators.max(1000)]]
    })
  }

  private reiniciar(): void {
    window.location.reload();
  }

}
