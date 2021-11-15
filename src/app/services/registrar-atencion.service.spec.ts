import { TestBed } from '@angular/core/testing';

import { RegistrarAtencionService } from './registrar-atencion.service';

describe('RegistrarAtencionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarAtencionService = TestBed.get(RegistrarAtencionService);
    expect(service).toBeTruthy();
  });
});
