import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestOpComponent } from './gest-op.component';

describe('GestOpComponent', () => {
  let component: GestOpComponent;
  let fixture: ComponentFixture<GestOpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestOpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
