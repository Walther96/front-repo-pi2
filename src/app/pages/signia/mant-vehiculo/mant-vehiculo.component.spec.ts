import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantVehiculoComponent } from './mant-vehiculo.component';

describe('MantVehiculoComponent', () => {
  let component: MantVehiculoComponent;
  let fixture: ComponentFixture<MantVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
