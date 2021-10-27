import { TestBed } from '@angular/core/testing';

import { RolOpService } from './rol-op.service';

describe('RolOpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolOpService = TestBed.get(RolOpService);
    expect(service).toBeTruthy();
  });
});
