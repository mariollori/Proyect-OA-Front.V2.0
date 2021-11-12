import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerBlancComponent } from './spinner-blanc.component';

describe('SpinnerBlancComponent', () => {
  let component: SpinnerBlancComponent;
  let fixture: ComponentFixture<SpinnerBlancComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerBlancComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerBlancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
