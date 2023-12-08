import { TestBed } from '@angular/core/testing';

import { PokemonDbService } from './pokemon-db.service';

describe('PokemonDbService', () => {
  let service: PokemonDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
