import { TestBed } from '@angular/core/testing';

import { TranscriptionsServiceService } from './transcriptions-service.service';

describe('TranscriptionsServiceService', () => {
  let service: TranscriptionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranscriptionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
