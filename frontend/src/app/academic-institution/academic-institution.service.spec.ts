import { TestBed } from '@angular/core/testing';

import { AcademicInstitutionService } from './academic-institution.service';

describe('AcademicInstitutionService', () => {
  let service: AcademicInstitutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicInstitutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
