import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiorutaComponent } from './cambioruta.component';

describe('CambiorutaComponent', () => {
  let component: CambiorutaComponent;
  let fixture: ComponentFixture<CambiorutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiorutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiorutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
