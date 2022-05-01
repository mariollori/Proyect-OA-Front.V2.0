import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePsswComponent } from './change-pssw.component';

describe('ChangePsswComponent', () => {
  let component: ChangePsswComponent;
  let fixture: ComponentFixture<ChangePsswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePsswComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePsswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
