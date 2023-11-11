import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProcesosComponent } from './agregar-procesos.component';

describe('AgregarProcesosComponent', () => {
  let component: AgregarProcesosComponent;
  let fixture: ComponentFixture<AgregarProcesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProcesosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
