import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantBaseComponent } from './mant-base.component';

describe('MantBaseComponent', () => {
  let component: MantBaseComponent;
  let fixture: ComponentFixture<MantBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
