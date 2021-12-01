import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDatoComponent } from './perfil-dato.component';

describe('PerfilDatoComponent', () => {
  let component: PerfilDatoComponent;
  let fixture: ComponentFixture<PerfilDatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilDatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
