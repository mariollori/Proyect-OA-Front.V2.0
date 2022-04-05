import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaInComponent } from './bandeja-in.component';

describe('BandejaInComponent', () => {
  let component: BandejaInComponent;
  let fixture: ComponentFixture<BandejaInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
