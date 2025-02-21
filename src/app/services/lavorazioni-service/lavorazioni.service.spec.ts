import { TestBed } from '@angular/core/testing';

import { LavorazioniService } from './lavorazioni.service';

describe('LavorazioniService', () => {
  let service: LavorazioniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LavorazioniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
