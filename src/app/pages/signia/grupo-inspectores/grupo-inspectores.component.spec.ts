import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoInspectoresComponent } from './grupo-inspectores.component';

describe('GrupoInspectoresComponent', () => {
  let component: GrupoInspectoresComponent;
  let fixture: ComponentFixture<GrupoInspectoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoInspectoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoInspectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
