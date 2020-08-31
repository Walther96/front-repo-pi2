import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoSalidaComponent } from './requerimiento-salida.component';

describe('RequerimientoSalidaComponent', () => {
  let component: RequerimientoSalidaComponent;
  let fixture: ComponentFixture<RequerimientoSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequerimientoSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimientoSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
