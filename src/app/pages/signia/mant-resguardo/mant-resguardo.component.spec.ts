import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantResguardoComponent } from './mant-resguardo.component';

describe('MantResguardoComponent', () => {
  let component: MantResguardoComponent;
  let fixture: ComponentFixture<MantResguardoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantResguardoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantResguardoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
