import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerHomeComponent } from './spinner-home.component';

describe('SpinnerHomeComponent', () => {
  let component: SpinnerHomeComponent;
  let fixture: ComponentFixture<SpinnerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
