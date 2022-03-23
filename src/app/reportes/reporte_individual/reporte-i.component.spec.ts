import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteIComponent } from './reporte-i.component';

describe('ReporteIComponent', () => {
  let component: ReporteIComponent;
  let fixture: ComponentFixture<ReporteIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
