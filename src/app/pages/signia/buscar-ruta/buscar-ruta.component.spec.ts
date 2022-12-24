import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarRutaComponent } from './buscar-ruta.component';

describe('BuscarRutaComponent', () => {
  let component: BuscarRutaComponent;
  let fixture: ComponentFixture<BuscarRutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarRutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
