import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegDatoPsicologoComponent } from './reg-dato-psicologo.component';

describe('RegDatoPsicologoComponent', () => {
  let component: RegDatoPsicologoComponent;
  let fixture: ComponentFixture<RegDatoPsicologoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegDatoPsicologoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegDatoPsicologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
