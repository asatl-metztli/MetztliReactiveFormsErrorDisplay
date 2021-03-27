import { TestBed } from '@angular/core/testing';

import { NgxMezErrorDisplayService } from './ngx-mez-error-display.service';

describe('NgxMezErrorDisplayService', () => {
  let service: NgxMezErrorDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMezErrorDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
