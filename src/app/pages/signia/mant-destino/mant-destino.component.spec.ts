import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantDestinoComponent } from './mant-destino.component';

describe('MantDestinoComponent', () => {
  let component: MantDestinoComponent;
  let fixture: ComponentFixture<MantDestinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantDestinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
