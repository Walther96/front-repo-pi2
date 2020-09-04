import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoSalidasComponent } from './historico-salidas.component';

describe('HistoricoSalidasComponent', () => {
  let component: HistoricoSalidasComponent;
  let fixture: ComponentFixture<HistoricoSalidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoSalidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
