import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpsiComponent } from './loginpsi.component';

describe('LoginpsiComponent', () => {
  let component: LoginpsiComponent;
  let fixture: ComponentFixture<LoginpsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginpsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginpsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
