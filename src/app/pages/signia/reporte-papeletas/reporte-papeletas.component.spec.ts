import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePapeletasComponent } from './reporte-papeletas.component';

describe('ReportePapeletasComponent', () => {
  let component: ReportePapeletasComponent;
  let fixture: ComponentFixture<ReportePapeletasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePapeletasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePapeletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
