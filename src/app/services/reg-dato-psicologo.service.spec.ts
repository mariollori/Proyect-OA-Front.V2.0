import { TestBed } from '@angular/core/testing';

import { RegDatoPsicologoService } from './reg-dato-psicologo.service';

describe('RegDatoPsicologoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegDatoPsicologoService = TestBed.get(RegDatoPsicologoService);
    expect(service).toBeTruthy();
  });
});
