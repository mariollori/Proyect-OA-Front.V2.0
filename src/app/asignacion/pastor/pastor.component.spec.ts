import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastorComponent } from './pastor.component';

describe('PastorComponent', () => {
  let component: PastorComponent;
  let fixture: ComponentFixture<PastorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
