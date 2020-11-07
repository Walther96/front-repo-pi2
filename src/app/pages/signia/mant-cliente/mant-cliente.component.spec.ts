import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantClienteComponent } from './mant-cliente.component';

describe('MantClienteComponent', () => {
  let component: MantClienteComponent;
  let fixture: ComponentFixture<MantClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
