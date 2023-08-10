import { TestBed } from '@angular/core/testing';

import { GetjokeService } from './getjoke.service';

describe('GetjokeService', () => {
  let service: GetjokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetjokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
