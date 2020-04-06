import { TestBed } from '@angular/core/testing';

import { ErroHandlerService } from './erro-handler.service';

describe('ErroHandlerService', () => {
  let service: ErroHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErroHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
