import { TestBed } from '@angular/core/testing';

import { TestservService } from './testserv.service';

describe('TestservService', () => {
  let service: TestservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
