import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantEmpleadoComponent } from './mant-empleado.component';

describe('MantEmpleadoComponent', () => {
  let component: MantEmpleadoComponent;
  let fixture: ComponentFixture<MantEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
