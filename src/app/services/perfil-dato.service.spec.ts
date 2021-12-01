import { TestBed } from '@angular/core/testing';

import { PerfilDatoService } from './perfil-dato.service';

describe('PerfilDatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerfilDatoService = TestBed.get(PerfilDatoService);
    expect(service).toBeTruthy();
  });
});
