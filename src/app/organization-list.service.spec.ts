import { TestBed } from '@angular/core/testing';

import { OrganizationListService } from './organization-list.service';

describe('OrganizationListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizationListService = TestBed.get(OrganizationListService);
    expect(service).toBeTruthy();
  });
});
